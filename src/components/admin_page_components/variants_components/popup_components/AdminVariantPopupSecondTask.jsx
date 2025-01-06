export const AdminVariantPopupSecondTask = ({taskValues, handleInputChange}) => {
    
    const addSecondTaskImg = (e) => {
        if(e.target.files.length === 0) return
        handleInputChange(e)
    }
    return (<>
        <div className="adminTaskContainer">
            <p>Задание 2</p>
            <div className="defInpContainer" style={{width: "100%", height: "100px"}}>
                <p>Гайд задания (установлено по умолчанию)</p>
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
                    <label className="btn defaultBtn" for="img" style={{width: "300px"}}>
                        <span style={{width: "100%", overflow: "hidden", whiteSpace: 'nowrap', textOverflow: "ellipsis", padding: "0 20px"}}>{taskValues.img ? taskValues.img.name : "Выберите изображение к заданию"}</span>
                    </label>
                    <input type="file" name="img" id="img" onChange={addSecondTaskImg}></input>
                    
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