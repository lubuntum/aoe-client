import { useState } from "react"
import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { phoneNumberFormat } from "../utils/phoneNumberFormat"
import { validateAuthData } from "../utils/validateAuthData"
import { registration } from "../../modules/api_modules/authAPI"

import { NewInput } from "../reusible_components/NewInput"
import { NewButton } from "../reusible_components/NewButton"
import { NewCheckbox } from "../reusible_components/NewCheckbox"
import { Loader } from "../reusible_components/Loader"

import routes from "../../routes"
import authStatuses from "../../modules/auth_modules/authStatuses"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const PartnerRegistrationContainer = ({onChangeContent, handleReturnHome, setNotification}) => {
    const [registrationProcessing, setRegistrationProcessing] = useState(false)

    const [registrationEmail, setRegistrationEmail] = useState("")
    const [registrationPassword, setRegistrationPassword] = useState("")
    const [registrationRepeatPassword, setRegistrationRepeatPassword] = useState("")
    const [registrationName, setRegistrationName] = useState("")
    const [registrationSecondName, setRegistrationSecondName] = useState("")
    const [registrationPatronymic, setRegistrationPatronymic] = useState("")
    const [registrationPhoneNumber, setRegistrationPhoneNumber] = useState("")

    const [privacyPolice, setPrivacyPolice] = useState(false)
    const [userAgreement, setUserAgreement] = useState(false)

    const hanldePrivacyPoliceChecked = () => {
        setPrivacyPolice(!privacyPolice)
    }

    const handleUserAgreementChecked = () => {
        setUserAgreement(!userAgreement)
    }

    const assembleData = () => {
        return {"email": registrationEmail,
                "name": registrationName,
                "secondName": registrationSecondName,
                "patronymic": registrationPatronymic,
                "phoneNumber": registrationPhoneNumber, 
                "password": registrationPassword,
                registrationDate: getCurrentDate(),
                isPartnerProposal: true,
        }
    }

    const handleSubmit = async() => {
        const registrationData = {
            registrationEmail,
            registrationName,
            registrationSecondName,
            registrationPatronymic,
            registrationPhoneNumber,
            registrationPassword,
            registrationRepeatPassword,
            privacyPolice,
            userAgreement
        }

        const validResult = validateAuthData(registrationData)
        setRegistrationProcessing(true)

        if (validResult) {
            setRegistrationProcessing(false)
            setNotification(validResult)
            return
        }

        try {
            const user = assembleData()
            const response = await registration(user)
            onChangeContent(1)
            setNotification(authStatuses.SUCCESS_REG_COMPLETE)
        } catch (err) {
            setNotification(authStatuses.ERROR_EMAIL_ALREADY_EXIST)
        } finally {
            setRegistrationEmail("")
            setRegistrationName("")
            setRegistrationSecondName("")
            setRegistrationPatronymic("")
            setRegistrationPhoneNumber("")
            setRegistrationPassword("")
            setRegistrationRepeatPassword("")
            setPrivacyPolice(false)
            setUserAgreement(false)
            setRegistrationProcessing(false)
        }
    }

    return (<>
        <div className="authContentBackHome" onClick={() => handleReturnHome()}>
            <CloseThinIcon className="svgIcon"/>
        </div>

        <div className="authContentTitle">
            <p>Hello Partner!</p>
        </div>

        <div className="authContentInputs">
            <NewInput key={"PartnerRegInput0"}
                      inputValue={registrationEmail}
                      inputType={"text"}
                      inputPlaceholder={"электронная почта"}
                      inputOnChange={(e) => {setRegistrationEmail(e.target.value)}}/>
            
            <NewInput key={"PartnerRegInput1"}
                      inputValue={registrationSecondName}
                      inputType={"text"}
                      inputPlaceholder={"фамилия"}
                      inputOnChange={(e) => {setRegistrationSecondName(e.target.value)}}/>
            
            <NewInput key={"PartnerRegInput2"}
                      inputValue={registrationName}
                      inputType={"text"}
                      inputPlaceholder={"имя"}
                      inputOnChange={(e) => {setRegistrationName(e.target.value)}}/>

            <NewInput key={"PartnerRegInput3"}
                      inputValue={registrationPatronymic}
                      inputType={"text"}
                      inputPlaceholder={"отчество"}
                      inputOnChange={(e) => {setRegistrationPatronymic(e.target.value)}}/>

            <NewInput key={"PartnerRegInput4"}
                      inputValue={registrationPhoneNumber}
                      inputType={"text"}
                      inputPlaceholder={"номер телефона"}
                      inputOnChange={(e) => {const formatted = phoneNumberFormat(e) 
                                             setRegistrationPhoneNumber(formatted)}}/>

            <NewInput key={"PartnerRegInput5"}
                      inputValue={registrationPassword}
                      inputType={"password"}
                      inputPlaceholder={"пароль"}
                      inputOnChange={(e) => {setRegistrationPassword(e.target.value)}}/>
            
            <NewInput key={"PartnerRegInput6"}
                      inputValue={registrationRepeatPassword}
                      inputType={"password"}
                      inputPlaceholder={"повторите пароль"}
                      inputOnChange={(e) => {setRegistrationRepeatPassword(e.target.value)}}/>
        </div>

        <div className="authContentCheckboxes">
            <NewCheckbox key={"PartnerRegCheckbox0"}
                         text={"Принять"}
                         checkboxChecked={privacyPolice}
                         checkboxOnChange={hanldePrivacyPoliceChecked}
                         checkboxId={"provacuPoliceCheckbox1"}
                         textLink={"политику конфиденциальности"}
                         link={()=>window.open(routes.PRIVACY_POLICE, "_blank")}/>

            <NewCheckbox key={"PartnerRegCheckbox1"}
                         text={"Принять"}
                         checkboxChecked={userAgreement}
                         checkboxOnChange={handleUserAgreementChecked}
                         checkboxId={"userAgreementCheckbox1"}
                         textLink={"пользовательское соглашение"}
                         link={()=>window.open(routes.USER_AGREEMENT, "_blank")}/>
        </div>

        <div className="authContentButtons">
            {!registrationProcessing ?
            <NewButton key={"PartnerRegButton0"}
                       buttonText={"Регистрация"}
                       buttonWidth={"100%"}
                       buttonFunc={handleSubmit}/> : 
            <div className="loaderProcessingContainer">
                <Loader/>
            </div>}

            <NewButton key={"PartnerRegButton2"}
                       buttonType={"link"}
                       buttonText={"Хочу быть обычным пользователем!"}
                       buttonFunc={() => {onChangeContent(1)}}/>
        </div>
    </>)
}