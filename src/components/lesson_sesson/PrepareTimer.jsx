import { useState, useEffect } from "react"
import { useLessonSpeaker } from "../../hooks/speech/useLessonSpeaker"
import {stages} from "./LessonSessionPage"
import { useTimer } from "../../hooks/useTimer"

export const PrepareTimer = ({sec, stage, setStage, task}) => {
    //const [time, setTime] = useState(sec)
    const {speak} = useLessonSpeaker()
    const speakStageText = () => {
        stage === stages.prepare_reading ?
        speak(`Now we are ready to start, Task ${task.taskType}`, () => {setStage(stages.reading)}) :
        speak("Start speaking please",() => {setStage(stages.speak)})
    }
    const {time, resetTimer} = useTimer(sec,speakStageText)

    return (<>
        <div className="Timer">{time} sec</div>
    </>)
}