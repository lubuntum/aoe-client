import { FirstTaskContent } from "./tasks_types/FirstTaskContent"
import { SecondTaskContent } from "./tasks_types/SecondTaskContent"
import { ThirdTaskContent } from "./tasks_types/ThirdTaskContent"
import { FourthTaskContent } from "./tasks_types/FourthTaskContent"

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
                {TaskContent ? <TaskContent task = {task}/> : <p>Unknown task type</p>}
            </div>}
    </>)
}