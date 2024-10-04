import "./css/selection_buttons.css"

export const ExamSelectionBtn = ({showContentByExamClick}) => {
    return (
        <div className="buttonContainer">
                <input type="checkbox" id='examBtn'></input>
                <label for='examBtn' onClick={()=>{showContentByExamClick()}}><p>Экзамен</p></label>
            </div>
    )
}