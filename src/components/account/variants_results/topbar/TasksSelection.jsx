import "../../../../App.css"
import "./css/topbar.css"
import "./css/topbar_media.css"

import { TaskSelectionBtn } from "./TaskSelectionBtn"
import { ExamSelectionBtn } from "./ExamSelectionBtn"

export const TaskSelection = ({showContentByTaskClick, currentVariant, showContentByExamClick}) => {
    let idleComponent
    if (currentVariant === undefined) {
        idleComponent = <div className="resultTaskSelectionContainer"><p>Вариант не выбран</p></div>
    }
   console.log(`currentVariant: ${currentVariant}`)
    return (<>
        {idleComponent && idleComponent}
        {idleComponent === undefined && (<>
            <div className="resultTaskSelectionContainer">
                {currentVariant.variantTasks.map((task, i)=>(
                    <TaskSelectionBtn type={"task"} id = {i} task = {task} showContentByTaskClick={showContentByTaskClick} />
                ))}
                <ExamSelectionBtn showContentByExamClick = {showContentByExamClick}/>
            </div>
        </>)}
    </>)
}