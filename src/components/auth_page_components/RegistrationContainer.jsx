import { useState } from "react"
import { InputField } from "../reusible_components/InputField"
import { Button } from "../reusible_components/Button"
import { Checkbox } from "../reusible_components/Checkbox"
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { registration } from "../../modules/api_modules/authAPI"
import routes from "../../routes"
import authStatuses from "../../modules/auth_modules/authStatuses"
import { Loader } from "../reusible_components/Loader"

export const RegistrationContainer = ({onChangeContent, handleReturnHome, setAuthorizationStatus}) => {
    const location = useLocation()
    const navigate = useNavigate()
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
                isPartnerProposal: location.pathname === routes.PARTNERSHIP_AUTHORIZATION,
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
            if (location.pathname !== routes.PARTNERSHIP_AUTHORIZATION) {
                onChangeContent(1)
                setAuthorizationStatus(authStatuses.SUCCESS_REG_COMPLETE)
            } else {
                navigate(routes.AUTORIZATION)
                onChangeContent(1)
                setAuthorizationStatus(authStatuses.SUCCESS_REG_COMPLETE)
            }
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
        if (!registrationEmail || !registrationName || !registrationSecondName || !registrationPassword || !registrationRepeatPassword) 
            return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY

        if (location.pathname === routes.PARTNERSHIP_AUTHORIZATION) {
            if (!registrationEmail || !registrationName || !registrationSecondName || !registrationPatronymic || !registrationPhoneNumber || !registrationPassword || !registrationRepeatPassword) 
                return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY
        }

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
        <div className="authorizationTitle">
            <p onClick={() => {handleReturnHome()}}>TestMy<span>Eng</span></p>
            <p>&gt;</p>
            {location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ? 
            <p>Регистрация</p> : 
            <p>Регистрация партнеров</p>}
        </div>
        <div className="registartionContainerInputs">
            <InputField key={"registrationInput0"}
                        inputType={"text"}
                        inputValue={registrationEmail}
                        inputPlaceholder={"Электронная почта"}
                        inputOnChange={(e) => {setRegistrationEmail(e.target.value)}}/>

            <InputField key={"registrationInput1"}
                        inputType={"text"}
                        inputValue={registrationSecondName}
                        inputPlaceholder={"Фамилия"}
                        inputOnChange={(e) => {setRegistrationSecondName(e.target.value)}}/>

            <InputField key={"registrationInput2"}
                        inputType={"text"}
                        inputValue={registrationName}
                        inputPlaceholder={"Имя"}
                        inputOnChange={(e) => {setRegistrationName(e.target.value)}}/>
            
            {location.pathname === routes.PARTNERSHIP_AUTHORIZATION && <>
            <InputField key={"registrationInput5"}
                        inputType={"text"}
                        inputValue={registrationPatronymic}
                        inputPlaceholder={"Отчество"}
                        inputOnChange={(e) => {setRegistrationPatronymic(e.target.value)}}/>

            <InputField key={"registrationInput6"}
                        inputType={"text"}
                        inputValue={registrationPhoneNumber}
                        inputPlaceholder={"Номер телефона"}
                        inputOnChange={(e) => {const formatted = handleFormatPhoneNumber(e) 
                                               setRegistrationPhoneNumber(formatted)}}/>
            </>}

            <InputField key={"registrationInput3"}
                        inputType={"password"}
                        inputValue={registrationPassword}
                        inputPlaceholder={"Пароль"}
                        inputOnChange={(e) => {setRegistrationPassword(e.target.value)}}/>

            <InputField key={"registrationInput4"}
                        inputType={"password"}
                        inputValue={registrationRepeatPassword}
                        inputPlaceholder={"Повторите пароль"}
                        inputOnChange={(e) => {setRegistrationRepeatPassword(e.target.value)}}/>
        </div>

        <div className="registrationContainerDocuments">
            <div className="documentsCheck">
                <Checkbox key={"registrationCheckbox0"}
                          checkboxText={"Принять"}
                          checkboxChecked={privacyPolice}
                          checkboxOnChange={hanldePrivacyPoliceChecked}/>

                <Button key={"registrationCheckboxButton0"}
                        buttonText={"политику конфиденциальности"}
                        buttonType={"link"}
                        buttonFunc={()=>window.open(routes.PRIVACY_POLICE, "_blank")}/>
            </div>

            <div className="documentsCheck">
                <Checkbox key={"registrationCheckbox1"}
                          checkboxText={"Принять"}
                          checkboxChecked={userAgreement}
                          checkboxOnChange={handleUserAgreementChecked}/>

                <Button key={"registrationCheckboxButton1"}
                        buttonText={"пользовательское соглашение"}
                        buttonType={"link"}
                        buttonFunc={()=>window.open(routes.USER_AGREEMENT, "_blank")}/>
            </div>
        </div>

        <div className="registrationOrContainer">
            {!registrationProcessing ? 
            <Button key={"registrationButton0"}
                    buttonText={"Регистрация"}
                    buttonWidth={"100%"}
                    buttonFunc={handleSubmit}/> :
            <Loader/>}
            
            {location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ? <>
            <div className="registrationContainerDivider">
                <div className="divider"></div>
                <p>или</p>
                <div className="divider"></div>
            </div>

            <Button key={"registrationButton1"}
                    buttonText={"Войти в аккаунт"}
                    buttonWidth={"100%"}
                    buttonFunc={() => onChangeContent(1)}/>

            <Button key={"registrationButton2"}
                    buttonText={"Хочу стать партнером!"}
                    buttonType={"link"}
                    buttonFunc={() => {navigate(routes.PARTNERSHIP_AUTHORIZATION)
                                       onChangeContent(2)}}/></> : 

            <Button key={"registrationButton3"}
                    buttonText={"Хочу быть обычным пользователем!"}
                    buttonType={"link"}
                    buttonFunc={() => {navigate(routes.AUTORIZATION)
                                       onChangeContent(2)}}/>}
        </div>
    </>)
}