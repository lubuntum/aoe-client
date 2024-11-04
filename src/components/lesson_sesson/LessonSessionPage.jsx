import '../../App.css'

import { useEffect, useRef, useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./micro_perfomance/MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
import { createPath, useLocation } from "react-router-dom"
import {getTasksByVariantId} from "../../modules/api/variant/VariantApi"
import { TaskContentViewer } from "../account/variants_results/content_viewer/TaskContentViewer"
import { createExam } from "../../modules/api/voice/LessonSessionAPI"
import { LessonSessionPanel } from "./LessonSessionPanel"
import { PrepareTimer } from "./PrepareTimer"
import { FirstTaskSession } from "./task_session/FirstTaskSession"
import { SecondTaskSession } from "./task_session/SecondTaskSession"
import { FourthTaskSession } from "./task_session/FourthTaskSession"
import { ThirdTaskSession } from "./task_session/ThirdTaskSession"
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

    const location = useLocation()
    const variant = location.state || {}
    const [microCheck, setMicroCheck] = useState(false)

    const [stage, setStage] = useState(stages.prepare_reading)

    useEffect(()=>{
        const loadTasksByVariantId = async () => {
            const response = await getTasksByVariantId(variant.id)
            response.data.forEach(task => {
                task.taskContent = JSON.parse(task.taskContent)
            })
            //await createExam(variant.id, localStorage.getItem("token"))
            setTasks(response.data)
            setCurrentTask(response.data.find((t)=>t.taskType === 1))
            //console.log(response.data)
        }
        loadTasksByVariantId()
    }, [])

    const handleNextTask = () => {
        if (currentTask.taskType >= 4) return;//Потом если == 4 или 1 задача закончить тест
        //TaskType всегда больше на единицу чем индекс сессии соотв. задания
        setCurrentTask(tasks.find((t)=>t.taskType === currentTask.taskType+1))
        setStage(stages.prepare_reading)
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