import "./css/selection_buttons.css"

export const ExamSelectionBtn = ({showContentByExamClick}) => {
    return (<>
        <div className="buttonContainer">
            <fieldset id="tasksGroup" className="radioContainer">
                <input type="radio" id='examBtn'></input>
                <label for='examBtn' onClick={()=>{showContentByExamClick()}}><p>Экзамен</p></label>
            </fieldset>
        </div>
    </>)
}