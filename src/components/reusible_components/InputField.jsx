import "./css/input.css"
import {ReactComponent as VisibilityIcon} from "../../res/icons/visibility_24dp_gi.svg"
import {ReactComponent as OffVisibilityIcon} from "../../res/icons/visibility_off_24dp_gi.svg"

import React, { useState, useEffect } from 'react';

const GOOD_PASS = "passwordGood";
const MIDDLE_PASS = "passwordMiddle";
const BAD_PASS = "passwordBad";
const InputVisibilityComponent = ({setCustomType}) => {
    const [isShow, setIsShow] = useState(false)
    const onClickHandler = () => {
        setIsShow(!isShow)
        if (isShow)
            setCustomType("password")
        else setCustomType("text")
    }
    return (
        <div className="visibility" onClick={onClickHandler}>
            {isShow ? <OffVisibilityIcon/> : <VisibilityIcon/>}
        </div>
    )
}
export const checkPasswordStrength = (pass) => {
    if (!pass) return ""
    let strength = 0
    if (pass.length >= 8) strength += 5
    if(/[a-z]/.test(pass)) strength += 1
    if(/[A-Z]{2}/.test(pass)) strength += 1
    if(/[0-9]/.test(pass)) strength += 1
    if(/[\W_]/.test(pass)) strength += 1
    strength = (strength / 9) * 100
    if (strength <= 61.0) return BAD_PASS;
    else if (strength > 61.0 && strength <= 70.0) return MIDDLE_PASS
    return GOOD_PASS
}

export const InputField = ({inputType = "text", 
                            inputValue = "",
                            inputPlaceholder = "",
                            inputOnChange,
                            hideIndicator = false}) => {

    const [passwordStrength, setPasswordStrength] = useState("")
    const [customInputType, setCustomInputType] = useState(null)
    useEffect(() => {
        if (inputType === "password" && hideIndicator === false) {
            setPasswordStrength(checkPasswordStrength(inputValue))
        }
    }, [inputValue, inputType])
    
    return (<>
        <div className="inputContainer">
            <input className="input"
                   type={customInputType ? customInputType : inputType}
                   value={inputValue}
                   placeholder={inputPlaceholder}
                   required
                   onChange={inputOnChange}
                   autoComplete="off"></input>
            
            {inputType === "password" && (
                <>
                    <div className={`strengthIndicator ${passwordStrength}`}></div>
                    <InputVisibilityComponent setCustomType={setCustomInputType} />
                </>
                
            )}
        </div>
    </>)
}