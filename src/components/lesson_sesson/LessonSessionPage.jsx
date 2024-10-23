import { useEffect, useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
import { useLocation } from "react-router-dom"
import {getTasksByVariantId} from "../../modules/api/variant/VariantApi"
import { TaskContentViewer } from "../account/variants_results/content_viewer/TaskContentViewer"
export const LessonSessionPage = () => {
    const [tasks, setTasks] = useState([])
    const [currentTaskType, setCurrentTaskType] = useState(1)
    const location = useLocation()
    const variant = location.state || {}
    const [microCheck, setMicroCheck] = useState(false)

    useEffect(()=>{
        const loadTasksByVariantId = async () => {
            const response = await getTasksByVariantId(variant.id)
            response.data.forEach(task => {
                task.taskContent = JSON.parse(task.taskContent)
            })
            setTasks(response.data)
            console.log(response.data)
        }
        loadTasksByVariantId()
    }, [])

    const handleNextTask = () => {
        if (currentTaskType >= 4 || currentTaskType <= 0) return;
        setCurrentTaskType(currentTaskType+1)
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
                <TaskContentViewer task={tasks.find((t)=>t.taskType === currentTaskType)}/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <a onClick={()=> {handleNextTask()}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Далее</a>
                </div>
            </>)
                
            }
        </div>
        </>
    )
}