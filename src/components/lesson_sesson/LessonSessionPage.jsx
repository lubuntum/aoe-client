import { useEffect, useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
import { createPath, useLocation } from "react-router-dom"
import {getTasksByVariantId} from "../../modules/api/variant/VariantApi"
import { TaskContentViewer } from "../account/variants_results/content_viewer/TaskContentViewer"
import { createExam } from "../../modules/api/voice/LessonSessionAPI"
import { LessonSessionPanel } from "./LessonSessionPanel"
import { PrepareTimer } from "./PrepareTimer"
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
    const [tasks, setTasks] = useState([])
    const [currentTask, setCurrentTask] = useState()

    const location = useLocation()
    const variant = location.state || {}
    const [microCheck, setMicroCheck] = useState(false)

    const [examStage, setExamStage] = useState(stages.prepare_reading)

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
        if (currentTask.taskType >= 4) return;
        //setCurrentTaskType(currentTaskType+1)
        setCurrentTask(tasks.find((t)=>t.taskType === currentTask.taskType+1))
    }
    const handleNextExamStage = (stage) => {
        setExamStage(stage)
    }
    

    return (
        <>
        <div className="lessonWrapper">
            <Header/>
            {!microCheck && 
            (<>
                <MicroPerfomance/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <a onClick={()=> {setMicroCheck(true)}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Приступить</a>
                </div>
            </>)
            }
            {microCheck && 
            (<>
                {(examStage === stages.prepare_reading || examStage === stages.prepare_speak) ?
                    <PrepareTimer sec={5} stage={examStage} setStage={setExamStage} task={currentTask}/> : 
                 (<>
                    <TaskContentViewer task={currentTask}/>
                    <LessonSessionPanel 
                        currentTask={currentTask} handleNextTask={handleNextTask} 
                        examStage={examStage} handleNextExamStage={handleNextExamStage} variantId={variant.id} />
                 </>)}
                
            </>)
                
            }
        </div>
        </>
    )
}