export const PricingPopup = ({warningMessage, messageText, messageCost, cost, messageConfirmation, acceptButton, declineButton}) => {
    return (<>
        <div className="pricingPopupContainer">
            <div className="pricingPopupHeader">
                <h2>{warningMessage}</h2>
            </div>
            <div className="pricingPopupInfo">
                <p>{messageText}</p>
                {cost && <p>{messageCost} <span>{cost}₽</span></p>}
                <p>{messageConfirmation}</p>
            </div>
            <div className="pricingPopupButtons">
                {acceptButton} {declineButton}
            </div>
        </div>
    </>)
}