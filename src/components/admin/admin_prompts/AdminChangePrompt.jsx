export const AdminChangePrompt = ({setCurrentPromptComponent, savePromptData, status, statusColor}) => {
    return (<>
        <div className="adminChangePromptContainer">
            <div className="changePromptBtns">
                {Array.from({length: 3}, (_, index) => (
                    <a className="btn defaultBtn" onClick={() => setCurrentPromptComponent(index + 2)} style={{width: "150px"}}>Промпт {index + 2}</a>
                ))}
            </div>
            {status && (            
                <div className={`adminPromptStatus ${(statusColor === "good") ? "adminPromptStatusGood" : (statusColor === "bad") ? "adminPromptStatusBad" : ""}`}>
                    <p>{status}</p>
                </div>
            )}
            <div className="savePromptBtns">
                <a className="btn greenBtn" onClick={savePromptData} style={{width: "150px"}}>Сохранить</a>
                <a className="btn redBtn" style={{width: "150px"}}>Сбросить</a>
            </div>
        </div>
    </>)
}