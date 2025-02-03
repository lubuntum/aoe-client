import { useState } from "react"
import { checkPsdStrength } from "../../../modules/password_modules/checkPasswordStrength.js"

import { PasswordStrength } from "../../reusible_components/PasswordStrength.jsx"

import { Button } from "../../reusible_components/Button.jsx"
import { InputField } from "../../reusible_components/InputField.jsx"

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
                <InputField key={"userChangePassInput0"}
                            inputType={"password"}
                            inputValue={pass}
                            inputPlaceholder={"Пароль"}
                            inputOnChange={(e)=>{setPass(e.target.value)}}/>

                <InputField key={"userChangePassInput1"}
                            inputType={"password"}
                            inputValue={repeatPass}
                            inputPlaceholder={"Повторите пароль"}
                            inputOnChange={(e)=>{setRepeatPass(e.target.value)}}/>

                <InputField key={"userChangePassInput2"}
                            inputType={"password"}
                            inputValue={oldPass}
                            inputPlaceholder={"Старый пароль"}
                            hideIndicator={true}
                            inputOnChange={(e)=>{setOldPass(e.target.value)}}/>

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