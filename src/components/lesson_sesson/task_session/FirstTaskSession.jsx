/**По факту тут не важно какая stage reading || speaking
 * поскольку логика только в отображении всего задания и записи голоса.
 * task structure : 
 * 
 * @param {*} task 
 * task.taskType (int 1-4)
 * task.taskContent (str obj)
 * @returns 
 */
import { useEffect } from "react"
import useMediaRecorder from "../../../hooks/useMediaRecorder"
import {stages} from "../LessonSessionPage"
import { TaskSessionPanel } from "./TaskSessionPanel"
import useLessonMediaRecorder from "../../../hooks/useLessonMediaRecorder"

import { TasksContentWrapper } from "../../item_task_content/TasksContentWrapper"

export const FirstTaskSession = ({task, stage, setStage, handleNextTask}) => { //blobRef + micro hook
    const {audioBlobRef, startRecording, stopRecording} = useLessonMediaRecorder(true)
    const handleNextTaskWithSaveAudio =  async () => {
        await stopRecording()
        console.log({"audio": audioBlobRef.current, "taskId": task.id})
        handleNextTask({"audio": audioBlobRef.current, "taskId": task.id})
    }
    
    if (stage === stages.speak) startRecording();

    return (<>
        {(stage === stages.reading || stage === stages.speak) && <TasksContentWrapper task={task}/>}

        {stage === stages.reading && <TaskSessionPanel btnText={"Skip"} nextAction={()=> {setStage(stages.prepare_speak)}} sec={1000} stage={stage}/>}

        {stage === stages.speak && <TaskSessionPanel btnText={"Next"} nextAction={()=> {handleNextTaskWithSaveAudio()}} sec={90} stage={stage}/>}
    </>)
}