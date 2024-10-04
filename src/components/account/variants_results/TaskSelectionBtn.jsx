import "./css/selection_buttons.css"

export const TaskSelectionBtn = ({type, id, task, showContentByTaskClick}) => {
    return(<>
            <div className="buttonContainer">
                <input type="checkbox" id={type+id}></input>
                <label for={type+id} onClick={()=>{showContentByTaskClick(task)}}><p>Задание {id+1}</p><span style={{display: "none"}}>{id+1}</span></label>
            </div>
        </>
    )
}