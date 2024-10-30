import { useState, useEffect } from "react"
import { useLessonSpeaker } from "../../hooks/speech/useLessonSpeaker"
import {stages} from "./LessonSessionPage"

export const PrepareTimer = ({sec, stage, setStage, task}) => {
    const [time, setTime] = useState(sec)
    const {speak} = useLessonSpeaker()
    useEffect(()=>{
        if (time > 0){
            const timerId = setInterval(()=>{
                setTime(time - 1)}, 1000)
            return () => clearInterval(timerId)
        }
        else {
            stage === stages.prepare_reading ?
                speak(`Now we are ready to start, Task ${task.taskType}`, () => {setStage(stages.reading)}) :
                speak("Start speaking please",() => {setStage(stages.speak)})
        }
    }, [time, stage, speak, task.taskType, setStage])
    return (<>
        <div className="Timer">{time} sec</div>
    </>)
}