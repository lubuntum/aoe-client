import "../../css/selection_buttons.css"

export const TaskSelectionBtn = ({type, id, task, showContentByTaskClick}) => {
    return (<>
        <div className="buttonContainer taskButton">
            <fieldset id="tasksGroup" className="radioContainer">
                <input type="radio" id={type+(id+1)} name="tasksGroup"></input>
                <label for={type+(id+1)} onClick={()=>{showContentByTaskClick(task)}}><p>Задание {id+1}</p><span style={{display: "none"}}>З.{id+1}</span></label>
            </fieldset>
        </div>
    </>)
}