import "./css/popup.css"

export const PopupContainer = ({component, setShowPopup}) => {
    const PopupContent = component

    return (<>
        <div className="popupcontainer">
            <PopupContent setShowPopup = {setShowPopup}/>
        </div>
    </>)
}