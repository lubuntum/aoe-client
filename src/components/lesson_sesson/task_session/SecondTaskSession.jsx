import { useRef, useState } from "react"

import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { stages } from "../lesson_session_page/LessonSessionPage"
import { TaskSessionPanel } from "./TaskBottomPanel"
import { TasksContentWrapper } from "./TasksContentWrapper"
import { useLessonSpeaker } from "../../../hooks/sound/OLD_useLessonSpeaker"

import { useSoundSpeaker } from "../../../hooks/sound/useSoundSpeaker"
import notification from "../../../res/wavs/beep.wav"
import { useAudioSpeaker } from "../../../hooks/sound/OLD_useAudioSpeaker"
import { speechUrls, topicsTaskTwoUrls } from "../../../speechUrls"
const urlsQuestionRecordKeys = [
    "QUESTION_ONE", "QUESTION_TWO", "QUESTION_THREE", "QUESTION_FOUR"
]
export const SecondTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [topicNumber, setTopicNumber] = useState(0)
    const {speak} = useLessonSpeaker()
    const {speakAudio} = useAudioSpeaker()
    const [studentAnswering, setStudentAnswering] = useState(false)
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(false)
    const {playAndEvent} = useSoundSpeaker(notification)

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

    const speakQuestionNumber = () => {
        try {
            speakAudio(topicsTaskTwoUrls[topicNumber+1], ()=>{playAndEvent(() => {setStudentAnswering(true)})})
        } catch(err) {
            console.error("Error occured while speaking topic", err)
            speak(`Question ${topicNumber+1}`,()=>{playAndEvent(() => {setStudentAnswering(true)})})
        }
    }

    if (stage === stages.speak) task.topicNumber = topicNumber
    if (stage === stages.speak && !studentAnswering) {
        //speak(`Question ${topicNumber+1}`,()=>{playAndEvent(() => {setStudentAnswering(true)})})
        speakQuestionNumber()
    }
    if (stage === stages.speak && studentAnswering) startRecording()

    return (<>
        <TasksContentWrapper task={task}/>
        {stage === stages.reading && 
            <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={""} stage={stage}/>}
        {(stage === stages.speak && !studentAnswering) && 
            <TaskSessionPanel btnText={"Next"} nextAction={()=> {}} sec={""} stage={stage}/>}
        {(stage === stages.speak && studentAnswering) && 
            <TaskSessionPanel key={topicNumber} btnText={"Next"} nextAction={()=> {handleNextTopicNumber()}} sec={""} stage={stage}/>}
    </>)
}