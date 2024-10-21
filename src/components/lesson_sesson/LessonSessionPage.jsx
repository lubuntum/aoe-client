import { useState } from "react"
import Header from "../header/Header"
import { MicroPerfomance } from "./MicroPerfomance"
import "./css/lesson.css"
import "./css/micro_perfomance.css"
export const LessonSessionPage = ({variant}) => {
    const [microCheck, setMicroCheck] = useState(false)
    return (
        <>
        <div className="lessonWrapper">
            <Header/>
            {!microCheck && <MicroPerfomance/>}
        </div>
        
        </>
    )
}