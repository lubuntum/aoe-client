export const AdminPopupFirstTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 1</p>
            <div className="defInpContainer" style={{width: "100%", height: "100px"}}>
                <p>Гайд задания</p>
                <textarea className="defTextArea"
                          placeholder="---"
                          id="taskGuide"
                          value={taskValues.taskGuide}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="defInpContainer" style={{width: "100%", height: "300px"}}>
                <p>Текст задания</p>
                <textarea className="defTextArea"
                          placeholder="---"
                          id="taskText"
                          value={taskValues.taskText}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
        </div>
    </>)
}