import { useState } from "react"
import { resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"

import { NewInput } from "../reusible_components/NewInput"
import { NewButton } from "../reusible_components/NewButton"
import { Loader } from "../reusible_components/Loader"

import authStatuses from "../../modules/auth_modules/authStatuses"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const ForgetPasswordContainer = ({onChangeContent, handleReturnHome, setNotification}) => {
    const [forgetEmail, setForgetEmail] = useState()
    const [forgetProcessing, setForgetProcessing] = useState(false)

    const handleSubmit = async() => {
        setForgetProcessing(true)
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!forgetEmail) {
            setNotification(authStatuses.ERROR_FORGET_EMAIL_EMPTY)
            setForgetProcessing(false)
            return
        }
        if (!regex.test(forgetEmail)) {
            setNotification(authStatuses.ERROR_EMAIL_NOT_VALID)
            setForgetProcessing(false)
            return
        }
        try {
            const response = await resetPasswordEmailRequest(forgetEmail)
            setNotification(authStatuses.SUCCESS_FORGET_EMAIL_SEND)
            setForgetProcessing(false)
            setForgetEmail("")
        } catch (err) {
            setNotification(authStatuses.ERROR_FORGET_EMAIL_FAILED)
            setForgetProcessing(false)
        }
    }

    return(<>
        <div className="authContentBackHome" onClick={() => handleReturnHome()}>
            <CloseThinIcon className="svgIcon"/>
        </div>

        <div className="authContentTitle">
            <p>Reset password</p>
        </div>

        <div className="authContentInputs">
            <NewInput key={"resetInput0"}
                    inputValue={forgetEmail}
                    inputType={"text"}
                    inputPlaceholder={"электронная почта"}
                    inputOnChange={(e) => {setForgetEmail(e.target.value)}}/>
        </div>

        <div className="authContentButtons">
            {!forgetProcessing ? 
            <NewButton key={"resetButton0"}
                       buttonText={"Сбросить пароль"}
                       buttonWidth={"100%"}
                       buttonFunc={handleSubmit}/> :
            <div className="loaderProcessingContainer">
                <Loader/>
            </div>}
            
            <div className="authContentCreateAccount">
                <p>Передумали сбрасывать?</p>
                <NewButton key={"resetButton1"}
                           buttonType={"link"}
                           buttonText={"Назад"}
                           buttonFunc={() => onChangeContent(1)}/>
            </div>
        </div>
    </>)
}