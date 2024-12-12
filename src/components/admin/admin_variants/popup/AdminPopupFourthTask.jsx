import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupFourthTask = ({taskValues, handleInputChange}) => {
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 4</p>
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
            <div className="defInpContainer" style={{width: "100%"}}>
                <input className="defInp" 
                        type="text" 
                        placeholder="Текст задания"
                        id="text"
                        value={taskValues.text}
                        onChange={handleInputChange}
                        required>   
                </input>
            </div>
            <div className="adminTaskQuestion">
                {taskValues.subTasks.map((subTask, index) =>
                    (<div className="defInpContainer" style={{width: "100%"}}>
                        <input className="defInp" 
                               key={`subTask${index}`}
                               type="text" 
                               placeholder={`${index+1} вопрос`}
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
                    <label className="defBtn" for="unplodaImg3" style={{width: "200px"}}>Выберите файл</label>
                    <input type="file" name="img" id="unplodaImg3"></input>
                    <p><a className="defBtn deleteBtn"><DeleteIcon className="defBtnSvg deleteBtnSvg"/></a>Здесь имя 1</p>
                    <p><a className="defBtn deleteBtn"><DeleteIcon className="defBtnSvg deleteBtnSvg"/></a>Здесь имя 2</p>
                </div>
            </div>
        </div>
    </>)
}