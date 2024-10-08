export const ExamSelectionBtn = ({showContentByExamClick}) => {
    return (<>
        <div className="buttonContainer examBtn">
            <fieldset id="tasksGroup" className="radioContainer">
                <input type="radio" id='examBtn' name="tasksGroup"></input>
                <label for='examBtn' onClick={()=>{showContentByExamClick()}}><p>Экзамен</p><span style={{display: "none"}}>Экз.</span></label>
            </fieldset>
        </div>
    </>)
}