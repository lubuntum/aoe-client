import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { stages } from "../lesson_session_page/LessonSessionPage"
import { TaskSessionPanel } from "./TaskBottomPanel"
import { TasksContentWrapper } from "./TasksContentWrapper"

export const FourthTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(true)
    const handleNextTaskWithSaveAudio = async () => {
        await stopRecording()
        handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
    }

    if(stage === stages.speak) startRecording()

    return (<>
        <TasksContentWrapper task={task} />
        {stage === stages.reading && 
            <TaskSessionPanel nextAction={()=>{setStage(stages.prepare_speak)}} btnText={"Skip"} sec={""} stage={stage}/>}
        {stage === stages.speak && 
            <TaskSessionPanel nextAction={()=>{handleNextTaskWithSaveAudio()}} btnText={"Next"} sec={""} stage={stage}/>}
    </>)
}