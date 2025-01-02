export const AdminTaskPrompt = ({currentTaskTypeId, tasksTypes, updatePromptForTaskType}) => {
    const currentTaskType = tasksTypes.find(t => t.id === currentTaskTypeId)
    console.log(`current id ${currentTaskTypeId}`)
    return (<>
        {currentTaskType && <> 
            <div className="adminPromptContainer">
            <p>{`Промпт для задания ${currentTaskType.type}`}</p>
            <div className="defInpContainer" style={{width: "100%", height: "calc(100vh - 404px)"}}>
                <textarea className="defTextArea"
                        placeholder={`Введите промпт для задания ${currentTaskType.type}`}
                        id="taskPrompt"
                        value={currentTaskType.prompt}
                        onChange={(e) => {updatePromptForTaskType(e.target.value, currentTaskType.id)}}
                        required>
                </textarea>
            </div>
        </div>
        </>}
        
    </>)
}