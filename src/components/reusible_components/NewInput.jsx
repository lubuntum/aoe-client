import "./css/new_input.css"

import { useState } from "react"

import { ReactComponent as VisibilityIcon } from "../../res/icons/visibility_24dp_gi.svg"
import { ReactComponent as OffVisibilityIcon } from "../../res/icons/visibility_off_24dp_gi.svg"

const InputVisibility = ({setCustomType}) => {
    const [isShow, setIsShow] = useState(false)

    const handleClick = () => {
        setIsShow(!isShow)
        if (isShow) setCustomType("password")
        else setCustomType("text")
    }
    return (
        <div className="inputVisibility" onClick={handleClick}>
            {isShow ? <OffVisibilityIcon className="svgIcon"/> : <VisibilityIcon className="svgIcon"/>}
        </div>
    )
}

export const NewInput = ({inputType, inputValue, inputPlaceholder, inputOnChange}) => {
    const [customInputType, setCustomInputType] = useState(null)

    return (
        <div className="customInputContainer">
            <input className="customInput"
                   type={customInputType ? customInputType : inputType}
                   value={inputValue ? inputValue : ""}
                   placeholder={inputPlaceholder ? inputPlaceholder : "Placeholder"}
                   onChange={inputOnChange}
                   required
                   autoComplete="off"/>
            {inputType === "password" && (
                <InputVisibility setCustomType={setCustomInputType}/>
            )}
        </div>
    )
}