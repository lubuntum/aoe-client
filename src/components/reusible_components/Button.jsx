import React, { useState } from 'react';
import "./css/button.css";
import "./css/button_media.css";

export const Button = ({ buttonType = "", buttonPadding = "", buttonWidth = "", buttonHeight = "", buttonIcon = null, buttonText, buttonFunc, isCopyButton, disabled}) => {
    const [copyMessage, setCopyMessage] = useState('')
    const [messagePosition, setMessagePosition] = useState({ top: 0, left: 0 })
    const [isButtonDisabled, setIsButtonDisabled] = useState(false)

    const handleClick = (event) => {
        if (isCopyButton && !isButtonDisabled) {
            const { pageX, pageY } = event
            setMessagePosition({ top: pageY - 20, left: pageX })
            setCopyMessage('Скопировано!')
            setIsButtonDisabled(true)

            setTimeout(() => {
                setCopyMessage('')
                setIsButtonDisabled(false)
            }, 1000)
        }

        if (buttonFunc) {
            buttonFunc()
        }
    }

    return (<>
        <button className={`button ${buttonType}`}
                style={{ padding: buttonPadding, width: buttonWidth, height: buttonHeight }}
                onClick={handleClick}
                disabled={disabled}>
            <span>{buttonIcon}{buttonText}</span>
        </button>
        {copyMessage && (
            <div className='copyPopup' style={{
                top: messagePosition.top,
                left: messagePosition.left}}>{copyMessage}
            </div>
        )}
    </>)
}