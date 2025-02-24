import "./css/textarea.css"

export const Textarea = ({textareaValue = "",
                         textareaPlaceholder = "",
                         textareaOnChange,
                         textareaHeight = "40px"}) => {
    return (
        <div className="textareaContainer">
            <textarea className="textarea"
                      value={textareaValue}
                      placeholder={textareaPlaceholder}
                      required
                      onChange={textareaOnChange}
                      autoComplete="off"
                      style={{height: `${textareaHeight}`, resize: "none"}}></textarea>
        </div>
    )
}