import { useRef, useState } from "react"

import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { stages } from "../lesson_session_page/LessonSessionPage"
import { TaskSessionPanel } from "./TaskBottomPanel"
import { TasksContentWrapper } from "./TasksContentWrapper"
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker"

import timersConfig from "../../../modules/timer_modules/configScenarioTimers"
import { useSound } from "../../../hooks/sound/useSound"
import notification from "../../../res/wavs/beep.wav"
export const SecondTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [topicNumber, setTopicNumber] = useState(0)
    const {speak} = useLessonSpeaker()
    const [studentAnswering, setStudentAnswering] = useState(false)
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(false)
    const {playAndEvent} = useSound(notification)

    const handleNextTopicNumber = async () => {
        await stopRecording()
        console.log({"audio": audioBlobRef.current, "taskId": task.id})
        if (topicNumber+1 >= task.taskContent.topics.length) {
            handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
            return
        }
        setStudentAnswering(false)
        setTopicNumber(topicNumber + 1)
    }

    if (stage === stages.speak) task.topicNumber = topicNumber
    if (stage === stages.speak && !studentAnswering) {
        speak(`Question ${topicNumber+1}`,()=>{playAndEvent(() => {setStudentAnswering(true)})})
        
    }
    if (stage === stages.speak && studentAnswering) startRecording()

    return (<>
        <TasksContentWrapper task={task}/>
        {stage === stages.reading && 
            <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={timersConfig.SECOND_TASK_READING_TIMER} stage={stage}/>}
        {(stage === stages.speak && !studentAnswering) && 
            <TaskSessionPanel btnText={"Next"} nextAction={()=> {}} sec={timersConfig.SECOND_TASK_CHANGE_TOPIC} stage={stage}/>}
        {(stage === stages.speak && studentAnswering) && 
            <TaskSessionPanel key={topicNumber} btnText={"Next"} nextAction={()=> {handleNextTopicNumber()}} sec={timersConfig.SECOND_TASK_SPEAKING_TIMER} stage={stage}/>}
    </>)
}