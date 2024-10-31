/**По факту тут не важно какая stage reading || speaking
 * поскольку логика только в отображении всего задания и записи голоса.
 * task structure : 
 * 
 * @param {*} task 
 * task.taskType (int 1-4)
 * task.taskContent (str obj)
 * @returns 
 */
import { TaskContentViewer } from "../../account/variants_results/content_viewer/TaskContentViewer"
import {stages} from "../LessonSessionPage"
export const FirstTaskSession = ({task, stage, setStage, handleNextTask}) => { //blobRef + micro hook

    console.log(task)
    return (
        <>
            {(stage === stages.reading || stage === stages.speak) && <TaskContentViewer task={task} />}
            {stage === stages.reading && 
                <a onClick={()=> {setStage(stages.prepare_speak)}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Skip</a>}
            {stage === stages.speak && 
                <a onClick={()=> {handleNextTask()}} className="btn" style={{width:'auto',padding:'0px 15px'}} >Next</a>}
        </>
    )
}