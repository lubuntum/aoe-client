import "./css/new_checkbox.css"

export const NewCheckbox = ({text, textLink, link, checkboxChecked, checkboxOnChange, checkboxId}) => {
    return (
        <div className="customCheckboxContainer">
            <input type="checkbox"
                   id={checkboxId}
                   checked={checkboxChecked}
                   onChange={checkboxOnChange}
                   className="customCheckboxInput"/>
            <label htmlFor={checkboxId} className="customCheckboxLabel">
                {text ? text : ""}
            </label>
            {textLink ? (
                <a className="customCheckboxButton" onClick={link}>
                    {textLink}
                </a>
            ) : ""}
        </div>
    )
}