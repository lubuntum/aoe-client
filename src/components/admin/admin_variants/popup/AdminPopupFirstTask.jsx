export const AdminPopupFirstTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 1</p>
            <div className="defInpContainer" style={{width: "100%", height: "80px"}}>
                <textarea className="defTextArea"
                          placeholder="Гайд задания"
                          id="taskGuide"
                          value={taskValues.taskGuide}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="defInpContainer" style={{width: "100%", height: "300px"}}>
                <textarea className="defTextArea"
                          placeholder="Текст задания"
                          id="taskText"
                          value={taskValues.taskText}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
        </div>
    </>)
}