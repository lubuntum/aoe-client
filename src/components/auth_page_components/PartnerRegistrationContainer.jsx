import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"

import { NewInput } from "../reusible_components/NewInput"
import { NewButton } from "../reusible_components/NewButton"
import { NewCheckbox } from "../reusible_components/NewCheckbox"
import { Loader } from "../reusible_components/Loader"

import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { registration } from "../../modules/api_modules/authAPI"

import routes from "../../routes"
import authStatuses from "../../modules/auth_modules/authStatuses"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const PartnerRegistrationContainer = ({onChangeContent, handleReturnHome, setAuthorizationStatus}) => {
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

    const handleFormatPhoneNumber = (e) => {
        const numbers = e.target.value.replace(/\D/g, '').substring(0, 11)
        let formatted = ""
        if (numbers.length === 0) 
            return ""
        formatted += "+"
        formatted += numbers.charAt(0) === "7" ? "7" : numbers.charAt(0)
        if(e.target.value === formatted) 
            return ""
        formatted += ""
        if (numbers.length > 1) 
            formatted += "(" + numbers.substring(1, 4)

        if (numbers.length > 4) 
            formatted += ")" + numbers.substring(4, 7)

        if (numbers.length > 7) 
            formatted += " " + numbers.substring(7, 9)

        if (numbers.length > 9) 
            formatted += "-" + numbers.substring(9, 11)

        return formatted
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
        setRegistrationProcessing(true)
        const validResult = validData()
        if (validResult) {
            setRegistrationProcessing(false)
            setAuthorizationStatus(validResult)
            return
        }
        try {
            const user = assembleData()
            const response = await registration(user)
            onChangeContent(1)
            setRegistrationEmail("")
            setRegistrationPassword("")
            setRegistrationRepeatPassword("")
            setRegistrationName("")
            setRegistrationSecondName("")
            setRegistrationPatronymic("")
            setRegistrationPhoneNumber("")
            setPrivacyPolice(false)
            setUserAgreement(false)
        } catch (err) {
            setAuthorizationStatus(authStatuses.ERROR_EMAIL_ALREADY_EXIST)
        } finally {
            setRegistrationProcessing(false)
        }
    }

    const validData = () => {
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        if (!registrationEmail || !registrationName || !registrationSecondName || !registrationPatronymic || !registrationPhoneNumber || !registrationPassword || !registrationRepeatPassword) 
            return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY

        if (!regex.test(registrationEmail)) 
            return authStatuses.ERROR_EMAIL_NOT_VALID

        if (registrationPassword.length < 5)
            return authStatuses.ERROR_PASS_NOT_VALID

        if (registrationPassword !== registrationRepeatPassword) 
            return authStatuses.ERROR_PASS_NOT_EQUAL

        if (!privacyPolice || !userAgreement) 
            return authStatuses.ERROR_RULES_NOT_CHECKED

        return null
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
                      inputOnChange={(e) => {const formatted = handleFormatPhoneNumber(e) 
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
            <NewButton key={"PartnerRegButton0"}
                       buttonText={"Регистрация"}
                       buttonWidth={"100%"}
                       buttonFunc={handleSubmit}/>

            <NewButton key={"PartnerRegButton2"}
                       buttonType={"link"}
                       buttonText={"Хочу быть обычным пользователем!"}
                       buttonFunc={() => {onChangeContent(1)}}/>
        </div>
    </>)
}