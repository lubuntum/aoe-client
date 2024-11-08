import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"
import { stages } from "../LessonSessionPage"
import { TaskSessionPanel } from "./TaskSessionPanel"

import { TasksContentWrapper } from "../../item_task_content/TasksContentWrapper"

export const FourthTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(true)
    const handleNextTaskWithSaveAudio = async () => {
        await stopRecording()
        handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
    }

    if(stage === stages.speak) startRecording()

    return (<>
        <TasksContentWrapper task={task} />

        {stage === stages.reading && <TaskSessionPanel nextAction={()=>{setStage(stages.prepare_speak)}} btnText={"Skip"} sec={5} stage={stage}/>}

        {stage === stages.speak && <TaskSessionPanel nextAction={()=>{handleNextTaskWithSaveAudio()}} btnText={"Next"} sec={5} stage={stage}/>}
    </>)
}