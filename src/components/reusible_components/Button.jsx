import "./css/button.css"
import "./css/button_media.css"

export const Button = ({buttonType = "", buttonPadding = "", buttonWidth = "", buttonHeight = "", buttonIcon = null, buttonText, buttonFunc}) => {
    return (<>
        <button className={`button ${buttonType}`}
                style={{padding: buttonPadding, width: buttonWidth, height: buttonHeight}}
                onClick={buttonFunc}>
                <span>{buttonIcon}{buttonText}</span>
        </button>
    </>)
}