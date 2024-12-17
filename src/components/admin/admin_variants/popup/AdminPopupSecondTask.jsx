import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupSecondTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 2</p>
            <div className="defInpContainer" style={{width: "100%", height: "80px"}}>
                <textarea className="defTextArea"
                          placeholder="Гайд задания"
                          id="taskGuide"
                          value={taskValues.taskGuide}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="defInpContainer" style={{width: "100%"}}>
                <input className="defInp" 
                        type="text" 
                        placeholder="Пояснение к заданию"
                        id="description"
                        value={taskValues.description}
                        onChange={handleInputChange}
                        required>   
                </input>
            </div>
            <div className="defInpContainer" style={{width: "100%", height: "80px"}}>
                <textarea className="defTextArea"
                          placeholder="Текст задания"
                          id="text"
                          value={taskValues.text}
                          onChange={handleInputChange}
                          required>
                </textarea>
            </div>
            <div className="adminTaskTopic">
                {taskValues.topics.map((topic, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <input className="defInp" 
                               key={`topic${index}`}
                               type="text" 
                               placeholder={`${index+1} вопрос`}
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
                    <label className="btn defaultBtn" for="uploadImg2" style={{width: "200px"}}>Выберите файл</label>
                    <input type="file" name="img" id="uploadImg2"></input>
                    <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
                    <p>Здесь имя вфывф ывфы в</p>
                </div>

                <div className="defInpContainer" style={{width: "100%"}}>
                    <input className="defInp" 
                            type="text" 
                            placeholder="Подпись к картинке"
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