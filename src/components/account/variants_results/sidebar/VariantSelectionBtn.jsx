export const VariantSelectionBtn = ({type, id, theme, showTasksClick, index}) => {
    return (<>
        <div className="buttonContainer variantBtn">
            <fieldset id="variantsGroup" className="radioContainer">
                <input type="radio" id={type+id} name="variantsGroup"></input>
                <label className="buttonLabel" for={type+id} onClick={()=>{showTasksClick(index)}}><p>{theme}</p><span style={{display: "none"}}>В.{id}</span></label>
            </fieldset>
        </div>
    </>)
}