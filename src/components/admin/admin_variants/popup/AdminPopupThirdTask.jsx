export const AdminPopupThirdTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 3</p>
            <div className="defInpContainer" style={{width: "100%", height: "80px"}}>
                <textarea className="defTextArea"
                          placeholder="Гайд задания"
                          id="taskGuide"
                          value={taskValues.taskGuide}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="defInpContainer" style={{width: "100%", height: "120px"}}>
                <textarea className="defTextArea"
                          placeholder="Текст задания (для спикера)"
                          id="taskText"
                          value={taskValues.taskText}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="adminTaskQuestion">
                {taskValues.questions.map((question, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <input className="defInp" 
                               key={`question${index}`}
                               type="text" 
                               placeholder={`${index+1} вопрос (для спикера)`}
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