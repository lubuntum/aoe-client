import "../../../App.css"
import "./css/lesson.css"

import { useEffect, useRef, useState } from "react"
import { HeaderMain } from "../../header_components/HeaderMain"
import { MicroPerfomance } from "../micro_perfomance/MicroPerfomance"
import { LessonUploadLoading } from "./LessonUploadLoading"
import { createPath, useLocation , useNavigate} from "react-router-dom"
import {getTasksByVariantId} from "../../../modules/api_modules/variantAPI"
import { PrepareTimer } from "../prepare_timer/PrepareTimer"

import { FirstTaskSession } from "../task_session/FirstTaskSession"
import { SecondTaskSession } from "../task_session/SecondTaskSession"
import { FourthTaskSession } from "../task_session/FourthTaskSession"
import { ThirdTaskSession } from "../task_session/ThirdTaskSession"
import { FooterMain } from "../../footer_components/FooterMain"

import { useLessonSpeaker } from '../../../hooks/speech/useLessonSpeaker'
import { createExamRequest, saveUserTaskRequest } from "../../../modules/api_modules/complitionScenarioAPI"
import routes from '../../../routes'

import timersConfig from "../../../modules/timer_modules/configScenarioTimers"
import { useAuth } from "../../../modules/auth_modules/AuthProvider"
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

    const [isLoading, setIsLoading] = useState(false)

    const { isAuth } = useAuth()

    const {speak} = useLessonSpeaker();
    useEffect(()=>{
        const loadTasksByVariantId = async () => {
            const response = await getTasksByVariantId(variant.id)
            
            //TODO 
            //Что бы можно было проходить только одно задание перед вызовом 
            //этого компонента добавить в variant.pickedTaskType
            //Наличие данного поля означает что юзер выбрал пройти только 1 задание в тек. варианте
            //Далее если это поле есть ищем так t.taskType === variant.pickedTaskType
            //и ниже условие currentTask.taskType >= 4 || variant.pickedTaskType
            //Подумать как завершать прохождение задания, если выбран один вариант
            //к примеру если выбран pickedTaskType = 2 , то что бы не переходил на 3 или 4
            setTasks(response.data)
            let currentTaskTemp
            if (variant.pickedTaskType){
                currentTaskTemp = response.data.find((t)=>t.taskType === variant.pickedTaskType)
                currentTaskTemp.taskSession = true
            } else {
                currentTaskTemp = response.data.find((t)=>t.taskType === 1)
                currentTaskTemp.taskSession = false
            }
            setCurrentTask(currentTaskTemp)
            
        }
        loadTasksByVariantId()
    }, [])

    const handleNextTask = (audioResult) => {
        audioResultsRef.current.push(audioResult)
        //audioResultsRef.current.forEach((audioRes, ind) => console.log(`${ind} ${audioRes.audio}`))
        if (variant.pickedTaskType) {
            speak("This is the end of the test", async ()=>{//isLoadingTrue
                await endTaskSession()
            })
            return
        }
        if (currentTask.taskType >= 4) {//isLoadingTrue
            speak("This is the end of the test", async ()=>{
                await endExamSession()
            })
            return;
        }//Потом если == 4 или 1 задача закончить тест
        //TaskType всегда больше на единицу чем индекс сессии соотв. задания
        setCurrentTask(tasks.find((t)=>t.taskType === currentTask.taskType+1))
        setStage(stages.prepare_reading)
    }

    const endTaskSession = async () => {
        setIsLoading(true)
        if (isAuth) {
            const sessionKey = localStorage.getItem("token")
            const customerTask = await saveTaskResult(sessionKey)
            const resultUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTask.id}&taskId=${currentTask.id}`
            setIsLoading(false)
            navigate(resultUrl)
        } else {
            console.log("Абоба")
        }
    }

    const endExamSession = async () => {
        setIsLoading(true)
        if (isAuth) {
            const sessionKey = localStorage.getItem("token")
            const exam = await createExam(sessionKey)
            await saveTasksResults(sessionKey, exam) // поменять 
            const resultsUrl = `/results?variantId=${variant.id}&examId=${exam.id}`
            setIsLoading(false)
            navigate(resultsUrl)
        } else {
            console.log("Абоба")
        }

    }
    const createExam = async (sessionKey) => {
        const response = await createExamRequest(variant.id, sessionKey)
        return await response.data
    }
    const saveTasksResults = async (sessionKey, exam) => {
        for (const audioBlobData of audioResultsRef.current) {
            const response = await saveUserTaskRequest(exam ? exam.id : null, audioBlobData.taskId, audioBlobData.audio, sessionKey)
            //if (!response.ok) throw new Error(`Error uploading ${audioBlob}`)
        }
    }
    const saveTaskResult = async (sessionKey) => {
        const response = await saveUserTaskRequest(null, audioResultsRef.current[0].taskId, audioResultsRef.current[0].audio, sessionKey)
        return response.data
    }

    let CurrentTaskSessionComponent = undefined
    if(currentTask !== undefined)
        CurrentTaskSessionComponent = taskSessionsComponents[currentTask.taskType]

    return (<>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="lessonWrapper">
                    {!microCheck && <MicroPerfomance setMicroCheck = {setMicroCheck}/>}

                    {(microCheck && !isLoading) && (<>
                        {(stage === stages.prepare_reading || stage === stages.prepare_speak) ?
                            <PrepareTimer sec={timersConfig.PREPARE_TIMER} 
                                          stage={stage} 
                                          setStage={setStage} 
                                          task={currentTask}/> : (<>
                            <CurrentTaskSessionComponent task = {currentTask} 
                                                         stage = {stage} 
                                                         setStage = {setStage} 
                                                         handleNextTask = {handleNextTask}/>
                        </>)} 
                    </>)}

                    {(microCheck && isLoading) && <LessonUploadLoading/>}
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}