export const OptionsButtons = ({buttonId, buttonIndex, buttonText, buttonIcon, buttonFnc, hoveredButton, rowIndex, handleMouseEnter, handleMouseLeave}) => {
    return (<>
        <a className="btn defaultBtn" 
        key={buttonId}
        onClick={() => buttonFnc()}
        style={{width: hoveredButton[rowIndex] === buttonIndex ? "120px" : hoveredButton[rowIndex] === null ? "40px" : "10px"}}
        onMouseEnter={() => handleMouseEnter(rowIndex, buttonIndex)}
        onMouseLeave={() => handleMouseLeave(rowIndex)}>
            <div className="svgIconPresentation" style={{display: hoveredButton[rowIndex] === null ? "flex" : "none"}}>{buttonIcon}</div>
            <p style={{display: hoveredButton[rowIndex] === buttonIndex ? "flex" : "none", fontWeight: "600"}}>{buttonText}</p>
        </a>
    </>)
}