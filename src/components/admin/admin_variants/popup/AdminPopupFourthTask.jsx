import { useEffect, useState } from "react"
import { ReactComponent as DeleteIcon } from "../../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminPopupFourthTask = ({taskValues, handleInputChange}) => {
    const [firstPickedImgName, setFirstPickedImgName] = useState("Первая картинка к заданию")
    const [secondPickedImgName, setSecondPickedImgName] = useState("Вторая картинка к заданию")
    const addImagesToFourthtask = (e , changePickedImageName) => {
        changePickedImageName(e.target.files[0].name)
        handleInputChange(e)
    }
    /**
     * Логина для выбора одного или двух вариантов с удалением 
     * const files = e.target.files;

        if (files.length === 0) return;

        if (files.length === 2) {
            // If two files are selected, update both states
            setFirstPickedImgName(files[0].name);
            setSecondPickedImgName(files[1].name);
        } else if (files.length === 1) {
            // If one file is selected
            if (firstPickedImgName === '...') {
            setFirstPickedImgName(files[0].name);
            } else if (secondPickedImgName === '...') {
            setSecondPickedImgName(files[0].name);
            }
        }
            Removed
            <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
            <p>{firstPickedImgName}</p>
            <a className="btn deleteBtn"><DeleteIcon className="deleteBtnSvg"/></a>
            <p>{secondPickedImgName}</p>
     */
    //console.log(taskValues.firstImage )
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
        
            <div className="adminTaskImgsContainer" style={{gap:"20px"}}>
                <div className="defInpFileContainer">
                    <label className="btn defaultBtn" for="firstImg" style={{width: "340px"}}>{taskValues.firstImg ? taskValues.firstImg.name : firstPickedImgName}</label>
                    <input type="file" name="firstImg" id="firstImg" onChange={(e) => addImagesToFourthtask(e, setFirstPickedImgName)} multiple></input>
                </div>
                <div className="defInpFileContainer">
                    <label className="btn defaultBtn" for="secondImg" style={{width: "340px"}}>{taskValues.secondImg ? taskValues.secondImg.name : secondPickedImgName}</label>
                    <input type="file" name="secondImg" id="secondImg" onChange={(e) => addImagesToFourthtask(e, setSecondPickedImgName)} multiple></input>
                </div>
            </div>
        </div>
    </>)
}