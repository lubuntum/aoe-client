import "./css/selection_buttons.css"

export const SelectionButtons = ({type, id, theme}) => {
    return (<>
        <div className="buttonContainer">
            <input type="checkbox" id={type+id}></input>
            <label for={type+id}><p>{theme}</p><span style={{display: "none"}}>{id}</span></label>
        </div>
    </>)
}