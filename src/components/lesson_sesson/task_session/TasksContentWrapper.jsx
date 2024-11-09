import "./css/task_content_wrapper.css"
import "./css/task_content.css"
import "./css/task_content_media.css"

import { FirstTaskContent } from "../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../item_task_content/FourthTaskContent"

export const TasksContentWrapper = ({task}) => {
    const taskContentWrapperComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    let TaskContent = taskContentWrapperComponents[task.taskType]

    return (<>
        <div className="taskContentWrapper">
            {TaskContent ? <TaskContent task={task}/> : <p>Aboba</p>}
        </div>
    </>)
}