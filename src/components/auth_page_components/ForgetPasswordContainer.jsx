import { useState } from "react"
import { Button } from "../reusible_components/Button"
import { InputField } from "../reusible_components/InputField"
import { resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"
import authStatuses from "../../modules/auth_modules/authStatuses"
import { Loader } from "../reusible_components/Loader"
/**
 * TODO добавить компонент для перехода по ссылке и сброс самого пароля.
 */
export const ForgetPasswordContainer = ({onChangeContent, handleReturnHome, setAuthorizationStatus}) => {
    const [forgetEmail, setForgetEmail] = useState()
    const [forgetProcessing, setForgetProcessing] = useState(false)

    const handleSubmit = async() => {
        setForgetProcessing(true)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!forgetEmail) {
            setAuthorizationStatus(authStatuses.ERROR_FORGET_EMAIL_EMPTY)
            setForgetProcessing(false)
            return
        }
        if (!regex.test(forgetEmail)) {
            setAuthorizationStatus(authStatuses.ERROR_EMAIL_NOT_VALID)
            setForgetProcessing(false)
            return
        }
        try {
            const response = await resetPasswordEmailRequest(forgetEmail)
            setAuthorizationStatus(authStatuses.SUCCESS_FORGET_EMAIL_SEND)
            setForgetProcessing(false)
        } catch (err) {
            setAuthorizationStatus(authStatuses.ERROR_FORGET_EMAIL_FAILED)
            setForgetProcessing(false)
        }
    }

    return(<>
        <div className="authorizationTitle">
            <p onClick={() => {handleReturnHome()}}>TestMy<span>Eng</span></p>
            <p>&gt;</p>
            <p>Сброс пароля</p>
        </div>

        <div className="forgetContainerInputs">
            <InputField key={"forgetInput0"}
                        inputType={"text"}
                        inputValue={forgetEmail}
                        inputPlaceholder={"Электронная почта"}
                        inputOnChange={(e) => {setForgetEmail(e.target.value)}}/>
        </div>

        <div className="forgetOrContainer">
            {!forgetProcessing ?
            <Button key={"forgetButton1"}
                    buttonText={"Сбросить пароль"}
                    buttonWidth={"100%"}
                    buttonFunc={handleSubmit}/> : 
            <Loader/>}
            
            <div className="forgetContainerDivider">
                <div className="divider"></div>
                <p>или</p>
                <div className="divider"></div>
            </div>

            <Button key={"fogetButton2"}
                    buttonText={"Назад"}
                    buttonWidth={"100%"}
                    buttonFunc={() => onChangeContent(1)}/>
        </div>
    </>)
}