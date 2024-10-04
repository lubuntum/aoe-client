import "./css/tasks_selection.css"

import { TaskSelectionBtn } from "./TaskSelectionBtn"
import {ExamSelectionBtn} from "./ExamSelectionBtn"
export const TaskSelection = ({showContentByTaskClick, currentVariant, showContentByExamClick}) => {
   let idleComponent = undefined
   if (currentVariant === undefined) {
     idleComponent = <div className="tasksContainerWrapper"><p>Вариант не выбран</p></div>
   }
    return (<>
    <div className="tasksContainerWrapper">
        {idleComponent && idleComponent}
        {idleComponent === undefined &&
        <>
            {currentVariant.tasks.map((task, i)=>(
                <TaskSelectionBtn type={"task"} id = {i} task = {task} showContentByTaskClick={showContentByTaskClick} />
            ))}
            <ExamSelectionBtn showContentByExamClick = {showContentByExamClick}/>
        </>
        }
        </div>
    </>)
}