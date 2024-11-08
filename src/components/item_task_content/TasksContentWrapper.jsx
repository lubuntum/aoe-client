import { FirstTaskContent } from "./FirstTaskContent"
import { SecondTaskContent } from "./SecondTaskContent"
import { ThirdTaskContent } from "./ThirdTaskContent"
import { FourthTaskContent } from "./FourthTaskContent"

import "./css/task_session_content.css"
import "./css/task_session_media.css"

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
            <p>НОВАЯ ОБЕРТКА</p>
            {TaskContent ? <TaskContent task={task}/> : <p>Aboba</p>}
        </div>
    </>)
}