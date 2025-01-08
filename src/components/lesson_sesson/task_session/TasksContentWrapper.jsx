import "./css/task_content_wrapper.css"
import "./css/task_content_media.css"

import { FirstTaskContent } from "../../reusible_components/FirstTaskContent"
import { SecondTaskContent } from "../../reusible_components/SecondTaskContent"
import { ThirdTaskContent } from "../../reusible_components/ThirdTaskContent"
import { FourthTaskContent } from "../../reusible_components/FourthTaskContent"

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