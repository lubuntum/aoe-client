export const AdminPopupThirdTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 3</p>
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
            <div className="defInpContainer" style={{width: "100%", height: "120px"}}>
                <p>Текст задания (для спикера)</p>
                <textarea className="defTextArea"
                          placeholder="---"
                          id="speaker"
                          value={taskValues.speaker}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="adminTaskQuestion">
                <p>Вопросы к заданию (для спикера)</p>
                {taskValues.questions.map((question, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <input className="defInp" 
                            key={`question${index}`}
                            type="text" 
                            placeholder="---"
                            id={`question${index}`}
                            value={question}
                            onChange={handleInputChange}
                            required>   
                        </input>
                    </div>)
                )}
            </div>
        </div>
    </>)
}