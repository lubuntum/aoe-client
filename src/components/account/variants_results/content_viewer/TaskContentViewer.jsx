import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

export const TaskContentViewer = ({task}) => {
    const taskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    let idleComponent = undefined
    let TaskContent = undefined
    if(task === undefined) {
        idleComponent = <div className="viewerContainerWrapper gridItem8"><p>Задача не выбрана</p></div>
    }
    else 
        TaskContent = taskContentComponents[task.taskType]
    console.info(task)
    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && 
            <div className="viewerContainerWrapper gridItem8">
                <p>СТАРАЯ ОБЕРТКА</p>
                {TaskContent ? <TaskContent task = {task}/> : <p>Unknown task type</p>}
            </div>}
    </>)
}