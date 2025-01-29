import React, { useState } from 'react'

export const ResultsOptionButtons = ({buttonId, buttonIndex, buttonText, buttonIcon, buttonFnc, hoveredButton, rowIndex, handleMouseEnter, handleMouseLeave, isCopyButton}) => {

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

        if (buttonFnc) {
            buttonFnc()
        }
    }

    return (<>
        <a className="resultsRecordsOptions" 
        key={buttonId}
        onClick={handleClick}
        style={{width: hoveredButton[rowIndex] === buttonIndex ? "120px" : hoveredButton[rowIndex] === null ? "40px" : "10px"}}
        onMouseEnter={() => handleMouseEnter(rowIndex, buttonIndex)}
        onMouseLeave={() => handleMouseLeave(rowIndex)}>
            <div className="svgIconPresentation" style={{display: hoveredButton[rowIndex] === null ? "flex" : "none"}}>{buttonIcon}</div>
            <p style={{display: hoveredButton[rowIndex] === buttonIndex ? "flex" : "none", fontWeight: "600"}}>{buttonText}</p>
        </a>
        {copyMessage && (
            <div className='copyPopup' style={{
                top: messagePosition.top,
                left: messagePosition.left}}>{copyMessage}
            </div>
        )}
    </>)
}