import "./css/new_button.css"

import { useState } from "react";

export const NewButton = ({ buttonType, buttonIcon, buttonText, buttonFunc, buttonWidth, isTooltip, isCopy, disabled }) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [copyMessageVisible, setCopyMessageVisible] = useState(false)
    const [canCopy, setCanCopy] = useState(true)

    const handleClick = () => {
        if (buttonFunc) buttonFunc()

        if (isCopy && canCopy) {
            setCopyMessageVisible(true)
            setCanCopy(false)
            setTimeout(() => {
                setCopyMessageVisible(false)
                setCanCopy(true)
            }, 1000)
        }
    }

    const handleMouseEnter = () => {
        if (isTooltip) setTooltipVisible(true)
    }

    const handleMouseLeave = () => {
        if (isTooltip) setTooltipVisible(false)
    }

    return (
        <div className="customButtonContainer" style={{width: buttonWidth}}>
            <button className={`customButton ${buttonType ? buttonType : ""}`}
                    onClick={handleClick}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    disabled={disabled}>
                <p>{buttonIcon ? buttonIcon : ""}{(buttonText && !isTooltip) ? buttonText : ""}</p>
            </button>
            {tooltipVisible && !copyMessageVisible && (
                <div className="tooltip">
                    {buttonText}
                </div>
            )}
            {copyMessageVisible && (
                <div className="copyMessage">
                    Скопировано
                </div>
            )}
        </div>
    )
}