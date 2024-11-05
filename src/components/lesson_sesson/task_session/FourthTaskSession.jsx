import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"
import { TaskContentViewer } from "../../account/variants_results/content_viewer/TaskContentViewer"
import { stages } from "../LessonSessionPage"
import { TaskSessionPanel } from "./TaskSessionPanel"

export const FourthTaskSession = ({task, stage, setStage, handleNextTask}) => {
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(true)
    const handleNextTaskWithSaveAudio = async () => {
        await stopRecording()
        handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
    }
    console.log("Forth component")
    if(stage === stages.speak) startRecording()
    return (
        <>
            <TaskContentViewer task={task} />
            {stage === stages.reading &&
                <TaskSessionPanel nextAction={()=>{setStage(stages.prepare_speak)}} btnText={"Skip"} sec={5} />
            }
            {stage === stages.speak &&
                <TaskSessionPanel nextAction={()=>{handleNextTaskWithSaveAudio()}} btnText={"Next"} sec={5} />
            }
        </>
    )
}