import { FirstTaskContent } from "../../../reusible_components/FirstTaskContent"
import { SecondTaskContent } from "../../../reusible_components/SecondTaskContent"
import { ThirdTaskContent } from "../../../reusible_components/ThirdTaskContent"
import { FourthTaskContent } from "../../../reusible_components/FourthTaskContent"

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