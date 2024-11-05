import { TaskContentViewer } from "../../account/variants_results/content_viewer/TaskContentViewer"
import { stages } from "../LessonSessionPage"
import { TaskSessionPanel } from "./TaskSessionPanel"

export const FourthTaskSession = ({task, stage, setStage, handleNextTask}) => {
    console.log("Forth component")
    return (
        <>
            <TaskContentViewer task={task} />
            {stage === stages.reading &&
                <TaskSessionPanel nextAction={()=>{setStage(stages.prepare_speak)}} btnText={"Skip"} sec={5} />
            }
            {stage === stages.speak &&
                <TaskSessionPanel nextAction={()=>{handleNextTask()}} btnText={"Next"} sec={5} />
            }
        </>
    )
}