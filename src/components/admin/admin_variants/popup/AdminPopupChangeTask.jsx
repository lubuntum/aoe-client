export const AdminPopupChangeTask = ({setCurrentPopupComponent, setShowPopup, sendVariant, viewStatus, status, statusColor}) => {
    return (<>
        <div className="adminChangeTaskContainer">
            <div className="changeTaskBtns">
                {Array.from({length: 4}, (_, index) => (
                    <a className="btn defaultBtn" onClick={() => setCurrentPopupComponent(index + 1)} style={{width: "150px"}}>Задание {index + 1}</a>
                ))}
            </div>
            <div className={`adminStatus ${viewStatus ? "adminStatusOpen" : ""} ${(statusColor === "good") ? "adminStatusGood" : (statusColor === "bad") ? "adminStatusBad" : ""}`}>
                <p>{status}</p>
            </div>
            <div className="saveCloseBtns">
                <a className="btn greenBtn" onClick={sendVariant} style={{width: "150px"}}>Создать</a>
                <a className="btn redBtn" onClick={()=>setShowPopup(false)} style={{width: "150px"}}>Отмена</a>
            </div>
        </div>
    </>)
}