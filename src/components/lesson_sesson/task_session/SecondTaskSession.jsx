import { TaskSessionPanel } from "./TaskSessionPanel"
import { stages } from "../LessonSessionPage"
import { useRef, useState } from "react"
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker"
import useMediaRecorder from "../../../hooks/useMediaRecorder"
import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { TasksContentWrapper } from "../../item_task_content/TasksContentWrapper"

export const SecondTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const [topicNumber, setTopicNumber] = useState(0)
    const {speak} = useLessonSpeaker()
    const [studentAnswering, setStudentAnswering] = useState(false)
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(false)
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

    if (stage === stages.speak && !studentAnswering) speak(`Question ${topicNumber+1}`,()=>{setStudentAnswering(true)})

    if (stage === stages.speak && studentAnswering) startRecording()

    return (<>
        <TasksContentWrapper task={task}/>

        {stage === stages.reading && <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={1000} stage={stage}/>}

        {(stage === stages.speak && !studentAnswering) && <TaskSessionPanel btnText={"Next"} nextAction={()=> {}} sec={0} stage={stage}/>}

        {(stage === stages.speak && studentAnswering) && <TaskSessionPanel key={topicNumber} btnText={"Next"} nextAction={()=> {handleNextTopicNumber()}} sec={5} stage={stage}/>}
    </>)
}