import "./css/tasks_selection.css"

import { SelectionButtons } from "./SelectionButtons"

export const TaskSelection = () => {
    return (<>
        <div className="tasksContainerWrapper">
            <SelectionButtons type={"task"} id={1} theme={"Задание 1"}/>
            <SelectionButtons type={"task"} id={2} theme={"Задание 2"}/>
            <SelectionButtons type={"task"} id={3} theme={"Задание 3"}/>
            <SelectionButtons type={"task"} id={4} theme={"Задание 4"}/>
            <SelectionButtons type={"task"} id={5} theme={"Эказмен"}/>
        </div>
    </>)
}