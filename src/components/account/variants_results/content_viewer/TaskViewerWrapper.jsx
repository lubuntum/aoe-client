import "./css/task_viewer.css"
import "./css/task_viewer_wrapper.css"
import "./css/task_viewer_media.css"

import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

export const TaskViewerWrapper = ({task}) => {
    const taskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    let idleComponent = undefined
    let TaskContent = undefined
    if(task === undefined) {
        idleComponent = <div className="taskViewerEmpty gridItem8"><p>Задача не выбрана</p></div>
    }
    else 
        TaskContent = taskContentComponents[task.taskType]

    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && 
            <div className="taskViewerWrapper gridItem8">
                {TaskContent ? <TaskContent task = {task}/> : <p>Unknown task type</p>}
            </div>}
    </>)
}