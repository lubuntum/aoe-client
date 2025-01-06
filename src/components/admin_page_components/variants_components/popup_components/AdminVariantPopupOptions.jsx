export const AdminVariantPopupOptions = ({setCurrentPopupComponent, setShowPopup, sendVariant, status, statusColor, taskValidate, variantValidate}) => {
    const allTaskValid = taskValidate.every(value => value === true)

    return (<>
        <div className="adminChangeTaskContainer">
            <div className="changeTaskBtns">
                {Array.from({length: 4}, (_, index) => (
                    <a className={`btn ${taskValidate[index] ? "greenBtn" : "defaultBtn"}`} onClick={() => setCurrentPopupComponent(index + 1)} style={{width: "150px"}}>Задание {index + 1}</a>
                ))}
            </div>
            <div className={`adminStatus ${(statusColor == "good") ? "adminStatusGood" : (statusColor === "bad") ? "adminStatusBad" : ""}`}>
                <p>{status}</p>
            </div>
            <div className="saveCloseBtns">
                <a className={`btn ${(variantValidate && allTaskValid) ? "greenBtn" : "blockBtn"}`} onClick={sendVariant} style={{width: "150px"}}>Создать</a>
                <a className="btn redBtn" onClick={()=>setShowPopup(false)} style={{width: "150px"}}>Отмена</a>
            </div>
        </div>
    </>)
}