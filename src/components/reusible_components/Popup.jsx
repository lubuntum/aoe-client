import "./css/popup.css"

export const Popup = ({component, setShowPopup}) => {
    const PopupContent = component

    return (<>
        <div className="popupContainer">
            <PopupContent setShowPopup = {setShowPopup}/>
        </div>
    </>)
}