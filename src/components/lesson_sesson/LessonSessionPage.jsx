import { useEffect, useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
import { useLocation } from "react-router-dom"
import {getTasksByVariantId} from "../../modules/api/variant/VariantApi"
export const LessonSessionPage = () => {
    const [tasks, setTasks] = useState([])
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

    return (
        <>
        <div className="lessonWrapper">
            <Header/>
            {!microCheck && 
            (<>
                <MicroPerfomance/>
                <div style={{display:'flex', justifyContent:'center'}}>
                    <a className="btn" style={{width:'auto',padding:'0px 15px'}} >Приступить</a>
                </div>
            </>)
            }
        </div>
        </>
    )
}