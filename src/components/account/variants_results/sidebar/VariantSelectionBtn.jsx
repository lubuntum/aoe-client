export const VariantSelectionBtn = ({type, id, theme, showTasksClick, index}) => {
    const changeVariant = (index) => {
        //TODO При выборе другого варианта если до этого выбран экзамен, он не изменится
        //Нужно как то смотреть если он выбран то ререндерить true
        //Надо смотреть если выбран экзамен, то нужно ререндерить экзамен а не таску
    }
    return (<>
        <div className="buttonContainer variantBtn">
            <fieldset id="variantsGroup" className="radioContainer">
                <input type="radio" id={type+id} name="variantsGroup"></input>
                <label className="buttonLabel" for={type+id} onClick={()=>{showTasksClick(index)}}><p>{theme}</p><span style={{display: "none"}}>В.{id}</span></label>
            </fieldset>
        </div>
    </>)
}