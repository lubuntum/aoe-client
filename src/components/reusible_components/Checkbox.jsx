import "./css/checkbox.css"

export const Checkbox = ({checkboxText, checkboxChecked, checkboxOnChange}) => {
    return (<>
        <label className="checkboxContainer">
            <input type="checkbox" checked={checkboxChecked} onChange={checkboxOnChange}></input>
            <span className={`checkbox ${checkboxChecked ? "checkboxAcitve" : "checkboxDisable"}`} aria-hidden="true"></span>
            {checkboxText}
        </label>
    </>)
}