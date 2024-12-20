import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupFourthTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 4</p>
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
            <div className="defInpContainer" style={{width: "100%"}}>
                <p>Текст задания (установлено по умолчанию)</p>
                <input className="defInp" 
                        type="text" 
                        placeholder="---"
                        id="text"
                        value={taskValues.text}
                        onChange={handleInputChange}
                        required>   
                </input>
            </div>
            <div className="adminTaskQuestion">
                <p>Вопросы к заданию</p>
                {taskValues.subTasks.map((subTask, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <input className="defInp" 
                            key={`subTask${index}`}
                            type="text" 
                            placeholder="---"
                            id={`subTask${index}`}
                            value={subTask}
                            onChange={handleInputChange}
                            required>   
                        </input>
                    </div>)
                )}
            </div>
            <div className="adminTaskImgsContainer">
                <div className="defInpFileContainer">
                    <label className="btn defaultBtn" for="unplodaImg3" style={{width: "340px"}}>Выберите картинки к заданию</label>
                    <input type="file" name="img" id="unplodaImg3"></input>
                    <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
                    <p>...</p>
                    <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
                    <p>...</p>
                </div>
            </div>
        </div>
    </>)
}