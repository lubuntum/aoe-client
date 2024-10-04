import "./css/selection_buttons.css"

export const VariantSelectionBtn = ({type, id, theme, showTasksClick, index}) => {
    return (<>
        <div className="buttonContainer">
            <input type="checkbox" id={type+id}></input>
            <label for={type+id} onClick={()=>{showTasksClick(index)}}><p>{theme}</p><span style={{display: "none"}}>{id}</span></label>
        </div>
    </>)
}