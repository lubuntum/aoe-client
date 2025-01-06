import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

export const ResultsTaskViewer = ({task, className}) => {
    const taskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    const TaskContent = taskContentComponents[task.taskType]

    return (<>
        <div className={`resultsViewerContainer ${className}`}>
            {TaskContent ? <TaskContent task = {task}/> : <p>Задание не найдено</p>}
        </div>
    </>)
}