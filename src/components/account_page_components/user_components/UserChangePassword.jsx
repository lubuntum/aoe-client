import { useState } from "react"
import { checkPsdStrength } from "../../../modules/password_modules/checkPasswordStrength.js"

import { PasswordStrength } from "../../reusible_components/PasswordStrength.jsx"

import { Button } from "../../reusible_components/Button.jsx"
import { InputField } from "../../reusible_components/InputField.jsx"
import { statuses } from "../../../statuses.js"
import { resetPasswordForCustomerAuth } from "../../../modules/api_modules/authAPI.js"
const localStatuses = {
    PASS_NOT_EQUAL:"PASS_NOT_EQUAL",
    PASS_TOO_SHORT:"PASS_TO_SHORT",
    EMPTY: "EMPTY"
}
export const UserChangePassword = ({className}) => {

    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [oldPass, setOldPass] = useState("")
    const [status, setStatus] = useState(statuses.IDLE)
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
    const changePass = async () =>{
        if (pass === "" || repeatPass === "" || oldPass === ""){
            setStatus(localStatuses.EMPTY)
            return
        }
        if(pass !== repeatPass) {
            setStatus(localStatuses.PASS_NOT_EQUAL)
            console.error("Not equal")
            return
        }
        if(pass.length < 5) {
            setStatus(localStatuses.PASS_TOO_SHORT)
            console.error("Пароль слишком маленький")
            return
        }
        try {
            const response = await resetPasswordForCustomerAuth(oldPass, pass, localStorage.getItem("token"))
            if (response.data)
                setStatus(statuses.SUCCESS)
        } catch {
            setStatus(statuses.ERROR)
        }
    }

    return (<>
        <div className={`userChangePasswordContainer ${className}`}>
            {status === localStatuses.ERROR && <p style={{color:"red"}}>Ошибка при смене пароля</p> }
            {status === localStatuses.EMPTY && <p style={{color:"red"}}>Заполните все поля</p> }
            {status === localStatuses.PASS_NOT_EQUAL && <p style={{color:"red"}}>Пароли не равны</p> }
            {status === localStatuses.PASS_TOO_SHORT && <p style={{color:"red"}}>Пароль короткий</p> }
            {status === statuses.SUCCESS && <p style={{color:"green"}}>Успешно</p>}
            {status === statuses.IDLE && <p>Сменить пароль</p>}
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