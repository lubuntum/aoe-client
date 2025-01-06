import { useState } from "react"
import { checkPsdStrength } from "../../../modules/password_modules/checkPasswordStrength.js"

import { PasswordStrength } from "../../reusible_components/PasswordStrength.jsx"

import { Button } from "../../reusible_components/Button.jsx"

export const UserChangePassword = ({className}) => {

    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [oldPass, setOldPass] = useState("")

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }
    const handleRepPassChange = (e) => {
        setRepeatPass(e.target.value)
    }
    const handleOldPassChange = (e) => {
        setOldPass(e.target.value)
    }

    //Событие клика смены пароля
    const changePass = ()=>{
        if(!(pass === repeatPass)) console.error("Пароли не равны")
        if(pass.length < 5) console.error("Длинна смол")
    }

    return (<>
        <div className={`userChangePasswordContainer ${className}`}>
            <p>Сменить пароль</p>

            <div className="userChangePasswordGrid">
                <div className="inputContainer">
                    <input type="password"
                           placeholder="Новый пароль"
                           required
                           value={pass}
                           onChange={handlePassChange}>
                    </input>
                    <PasswordStrength strengthStyle={checkPsdStrength(pass)}/>
                </div>

                <div className="inputContainer">
                    <input type="password"
                           placeholder="Повторите пароль"
                           required
                           value={repeatPass}
                           onChange={handleRepPassChange}>
                    </input>
                    <PasswordStrength strengthStyle={checkPsdStrength(repeatPass)}/>
                </div>

                <div className="inputContainer">
                    <input type="password"
                           placeholder="Старый пароль"
                           required
                           value={oldPass}
                           onChange={handleOldPassChange}>
                    </input>
                </div>

                <Button buttonType={""}
                        buttonPadding={"0 20px"}
                        buttonWidth={"100%"}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Применить"}
                        buttonFunc={()=>{changePass()}}/>
            </div>
        </div>
    </>)
}