import "./css/popup.css";

export const Popup = ({ component: Component, setShowPopup }) => {
    return (
        <div className="popupContainer">
            <Component setShowPopup={setShowPopup}/>
        </div>
    )
}