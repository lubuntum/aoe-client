import "./css/selection_buttons.css"

export const VariantSelectionBtn = ({type, id, theme, showTasksClick, index}) => {
    return (<>
        <div className="buttonContainer">
            <fieldset id="variantsGroup" className="radioContainer">
                <input type="radio" id={type+id} name="variantsGroup"></input>
                <label for={type+id} onClick={()=>{showTasksClick(index)}}><p>{theme}</p><span style={{display: "none"}}>{id}</span></label>
            </fieldset>
        </div>
    </>)
}