import { FirstTaskContent } from "../../../item_task_content/FirstTaskContent"
import { SecondTaskContent } from "../../../item_task_content/SecondTaskContent"
import { ThirdTaskContent } from "../../../item_task_content/ThirdTaskContent"
import { FourthTaskContent } from "../../../item_task_content/FourthTaskContent"

export const ResultsExamViewer = ({variant, className}) => {
    const TaskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    return (<>
        <div className={`resultsViewerContainer ${className}`}>
            {variant && variant.variantTasks.map((task, index) => {
                const TaskComponent = TaskContentComponents[task.taskType]
                return TaskComponent ? (<>
                    <div key={task.id}>
                        <p className="taskIterator">{`Задание ${index + 1}`}</p>
                        <TaskComponent task={task}/>
                    </div>
                </>) : <p>Экзамен не найден</p>
            })}
        </div>
    </>)
}