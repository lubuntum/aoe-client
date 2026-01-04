import "./css/checkbox_style.css"

export const Checkbox = ({checkboxText, checkboxLink, linkClick, checkboxId, checked, onChange}) => {
    return (<>
        <div className="checkbox_container">
            <input className="checkbox_input" type="checkbox" id={checkboxId} checked={checked} onChange={onChange} style={{ display: "none" }}/>
            <label className="checkbox_label" htmlFor={checkboxId}>
                {checkboxText ? checkboxText : ""}
            </label>
            {checkboxLink ?  <a onClick={linkClick}>{checkboxLink}</a> : ""}
        </div>
    </>)
}