export const AdminPromptOptions = ({setCurrentTaskTypeId, tasksTypes, updateCurrentTaskType, 
                                resetCurrentTaskType, status, statusColor}) => {
    return (<>
        <div className="adminChangePromptContainer">
            <div className="changePromptBtns">
                {Array.from({length: 3}, (_, index) => (
                    <a className="btn defaultBtn" onClick={() => setCurrentTaskTypeId(tasksTypes.find(t => t.type === index + 2).id)} style={{width: "150px"}}>Промпт {index + 2}</a>
                ))}
            </div>
            {status && (            
                <div className={`adminPromptStatus ${(statusColor === "good") ? "adminPromptStatusGood" : (statusColor === "bad") ? "adminPromptStatusBad" : ""}`}>
                    <p>{status}</p>
                </div>
            )}
            <div className="savePromptBtns">
                <a className="btn greenBtn" style={{width: "320px"}} onClick={updateCurrentTaskType}>Сохранить текущий промпт</a>
                <a className="btn redBtn" style={{width: "150px"}} onClick={resetCurrentTaskType}>Сбросить</a>
            </div>
        </div>
    </>)
}