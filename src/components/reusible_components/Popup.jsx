import "./css/popup.css";

import { Button } from "./Button"

import { ReactComponent as CloseIcon } from "../../res/icons/close_24dp_gi.svg"

export const Popup = ({ component: Component, setShowPopup }) => {
    return (
        <div className="popupContainer">
            <Button key={"popupCloseButton0"}
                    buttonIcon={<CloseIcon className="svgIcon"/>}
                    buttonType={"simple"}
                    buttonFunc={()=>setShowPopup(false)}/>
            <Component setShowPopup={setShowPopup}/>
        </div>
    )
}