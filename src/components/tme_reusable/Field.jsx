import "./css/inputs_style.css"

import { useState } from "react"

import { ReactComponent as VisibilityIcon } from "../../res/icons/visibility_24dp_gi.svg"
import { ReactComponent as OffVisibilityIcon } from "../../res/icons/visibility_off_24dp_gi.svg"

export const Field = ({ value, type = "text", onChange, onKeyPress, ph }) => {
    const [showPassword, setShowPassword] = useState(false)

    const isPasswordType = type === "password"

    const inputType = isPasswordType && showPassword ? "text" : type

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="field_container">
            <input
                className="input"
                type={inputType}
                value={value}
                onChange={onChange}
                onKeyDown={onKeyPress}
                placeholder={ph}
                required/>

            {isPasswordType && (<>
                {showPassword ? (
                    <OffVisibilityIcon className="svg_icon" onClick={togglePasswordVisibility}/>
                ) : (
                    <VisibilityIcon className="svg_icon" onClick={togglePasswordVisibility}/>
                )}
            </>)}
        </div>
    )
}