export const AccountPopup = ({warningMessage, messageText, messageCost, cost, messageConfirmation, acceptButton, declineButton}) => {
    return (<>
        <div className="accountAcceptPopupContainer">
            <div className="accountAcceptPopupHeader">
                <h2>{warningMessage}</h2>
            </div>
            <div className="accountAcceptPopupInfo">
                <p>{messageText}</p>
                <p>{messageCost} <span>{cost}₽</span></p>
                <p>{messageConfirmation}</p>
            </div>
            <div className="accountAcceptPopupButtons">
                {acceptButton} {declineButton}
            </div>
        </div>
    </>)
}