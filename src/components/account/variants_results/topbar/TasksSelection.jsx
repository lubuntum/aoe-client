import { TaskSelectionBtn } from "./TaskSelectionBtn"
import { ExamSelectionBtn } from "./ExamSelectionBtn"

export const TaskSelection = ({showContentByTaskClick, currentVariant, showContentByExamClick}) => {
    let idleComponent = undefined
    if (currentVariant === undefined) {
        idleComponent = <div className="resultTaskSelectionContainer"><p>Вариант не выбран</p></div>
    }
   
    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && (<>
            <div className="resultTaskSelectionContainer">
                {currentVariant.tasks.map((task, i)=>(
                    <TaskSelectionBtn type={"task"} id = {i} task = {task} showContentByTaskClick={showContentByTaskClick} />
                ))}
                <ExamSelectionBtn showContentByExamClick = {showContentByExamClick}/>
            </div>
        </>)}
    </>)
}