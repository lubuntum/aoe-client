import { FirstTaskContent } from "../../../reusible_components/FirstTaskContent"
import { SecondTaskContent } from "../../../reusible_components/SecondTaskContent"
import { ThirdTaskContent } from "../../../reusible_components/ThirdTaskContent"
import { FourthTaskContent } from "../../../reusible_components/FourthTaskContent"

export const ResultsExamViewer = ({variant, className}) => {
    const TaskContentComponents = {
        1:FirstTaskContent,
        2:SecondTaskContent,
        3:ThirdTaskContent,
        4:FourthTaskContent
    }

    return (<>
        <div className={`resultsViewerContainer ${className}`}>
            <div className="resultsViewerExamContainer">
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
        </div>
    </>)
}