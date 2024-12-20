import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupSecondTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 2</p>
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
            <div className="defInpContainer" style={{width: "100%"}}>
                <p>Пояснение к заданию (установлено по умолчанию)</p>
                <input className="defInp" 
                        type="text" 
                        placeholder="---"
                        id="description"
                        value={taskValues.description}
                        onChange={handleInputChange}
                        required>   
                </input>
            </div>
            <div className="defInpContainer" style={{width: "100%", height: "100px"}}>
                <p>Текст задания</p>
                <textarea className="defTextArea"
                          placeholder="---"
                          id="text"
                          value={taskValues.text}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="adminTaskTopic">
                {taskValues.topics.map((topic, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <p>{index + 1} вопрос</p>
                        <input className="defInp" 
                               key={`topic${index}`}
                               type="text" 
                               placeholder="---"
                               id={`topic${index}`}
                               value={topic}
                               onChange={handleInputChange}
                               required>   
                        </input>
                    </div>)
                )}
            </div>
            <div className="adminTaskImg">
                <div className="defInpFileContainer">
                    <label className="btn defaultBtn" for="uploadImg2" style={{width: "340px"}}>Выберите картинку к заданию</label>
                    <input type="file" name="img" id="uploadImg2"></input>
                    <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
                    <p>...</p>
                </div>

                <div className="defInpContainer" style={{width: "100%"}}>
                    <p>Подпись к картинке</p>
                    <input className="defInp" 
                            type="text" 
                            placeholder="---"
                            id="imgTitle"
                            value={taskValues.imgTitle}
                            onChange={handleInputChange}
                            required>   
                    </input>
                </div>
            </div>
        </div>
    </>)
}