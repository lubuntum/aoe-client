import '../../App.css'

import { useEffect, useRef, useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./micro_perfomance/MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
import { createPath, useLocation, useNavigate } from "react-router-dom"
import {getTasksByVariantId} from "../../modules/api/variant/VariantApi"
import { TaskContentViewer } from "../account/variants_results/content_viewer/TaskContentViewer"
import { createExam } from "../../modules/api/voice/LessonSessionAPI"
import { LessonSessionPanel } from "./LessonSessionPanel"
import { PrepareTimer } from "./PrepareTimer"
import { FirstTaskSession } from "./task_session/FirstTaskSession"
import { SecondTaskSession } from "./task_session/SecondTaskSession"
import { FourthTaskSession } from "./task_session/FourthTaskSession"
import { ThirdTaskSession } from "./task_session/ThirdTaskSession"
import { useLessonSpeaker } from '../../hooks/speech/useLessonSpeaker'
import { createExamRequest, saveUserTaskRequest } from "../../modules/api/voice/LessonSessionAPI"
import routes from '../../routes'
/*
TODO фишка сделать массив stages где будут хранится все стадии 
прохождения экзамена, помимо стадии выделить текущее задания
и имея стадию и задания можно легко задать то, что нужно сделать
к примеру speak, stop, next, prepare_timer, prepare, end, start 
первое задание стадии 
task1 - prepare_timer, prepare, prepare_timer, speak, stop,  next
task2 - prepare_timer, prepare, prepare_timer, speak, stop, speak, stop ...2, stop, next
Также тут return можно обернуть в компонент диктора, который принимает
task и stage и в зависимости от типа экзамена и этапа читает контент speaker:[...]
*/ 
export const stages = {"reading" : 1, "speak": 2,"prepare_reading": 3, "prepare_speak": 4, "next": 5}
export const LessonSessionPage = () => {
    const taskSessionsComponents = {
        1:FirstTaskSession,
        2:SecondTaskSession,
        3:ThirdTaskSession,
        4:FourthTaskSession
    }
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState()
    const audioResultsRef = useRef([])

    const navigate = useNavigate()
    const location = useLocation()
    const variant = location.state || {}
    const [microCheck, setMicroCheck] = useState(false)

    const [stage, setStage] = useState(stages.prepare_reading)

    const {speak} = useLessonSpeaker();
    useEffect(()=>{
        const loadTasksByVariantId = async () => {
            const response = await getTasksByVariantId(variant.id)
            response.data.forEach(task => {
                task.taskContent = JSON.parse(task.taskContent)
            })
            //TODO 
            //Что бы можно было проходить только одно задание перед вызовом 
            //этого компонента добавить в variant.pickedTaskType
            //Наличие данного поля означает что юзер выбрал пройти только 1 задание в тек. варианте
            //Далее если это поле есть ищем так t.taskType === variant.pickedTaskType
            //и ниже условие currentTask.taskType >= 4 || variant.pickedTaskType
            setTasks(response.data)
            setCurrentTask(response.data.find((t)=>t.taskType === 1))
        }
        loadTasksByVariantId()
    }, [])

    const handleNextTask = (audioResult) => {
        audioResultsRef.current.push(audioResult)
        audioResultsRef.current.forEach((audioRes, ind) => console.log(`${ind} ${audioRes.audio}`))
        if (currentTask.taskType >= 4) {
            speak("This is the end of the test", async ()=>{
                navigate(routes.TASK)
                await endLessonSession()
            })
            return;
        }//Потом если == 4 или 1 задача закончить тест
        //TaskType всегда больше на единицу чем индекс сессии соотв. задания
        setCurrentTask(tasks.find((t)=>t.taskType === currentTask.taskType+1))
        setStage(stages.prepare_reading)
    }

    const endLessonSession = async () => {
        const sessionKey = localStorage.getItem("token")
        const exam = await createExam(sessionKey)
        await saveTasksResults(sessionKey, exam)
        navigate(routes.TASK)
    }
    const createExam = async (sessionKey) => {
        const response = await createExamRequest(variant.id, sessionKey)
        return await response.data
    }
    const saveTasksResults = async (sessionKey, exam) => {
        for (const audioBlobData of audioResultsRef.current) {
            const response = await saveUserTaskRequest(exam.id, audioBlobData.taskId, audioBlobData.audio, sessionKey)
            //if (!response.ok) throw new Error(`Error uploading ${audioBlob}`)
        }
    }

    let CurrentTaskSessionComponent = undefined
    if(currentTask !== undefined)
        CurrentTaskSessionComponent = taskSessionsComponents[currentTask.taskType]

    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="lessonWrapper">
                    <Header/>

                    {!microCheck && 
                        <MicroPerfomance setMicroCheck = {setMicroCheck}/>
                    }
                    {microCheck && 
                    (<>
                        {(stage === stages.prepare_reading || stage === stages.prepare_speak) ?
                            <PrepareTimer sec={5} stage={stage} setStage={setStage} task={currentTask}/> : 
                        (<>
                            <CurrentTaskSessionComponent task = {currentTask} stage = {stage} 
                                setStage = {setStage} handleNextTask = {handleNextTask} />
                        </>)}
                        
                    </>)
                        
                    }
                </div>
            </div>
        </div>
    </>)
}