import { useState } from "react"
import { InputField } from "../reusible_components/InputField"
import { Button } from "../reusible_components/Button"
import { Checkbox } from "../reusible_components/Checkbox"
import { useLocation, useNavigate } from "react-router-dom"
import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { registration } from "../../modules/api_modules/authAPI"
import routes from "../../routes"

export const RegistrationContainer = ({handleToggle, loginToggle, setLoginToggle, setRegistrationConfirm,}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [registrationEmail, setRegistrationEmail] = useState(null)
    const [registrationName, setRegistrationName] = useState(null)
    const [registrationSecondName, setRegistrationSecondName] = useState(null)
    const [registrationPatronymic, setRegistrationPatronymic] = useState(null)
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [registrationPassword, setRegistrationPassword] = useState(null)
    const [registrationRepPassword, setRegistrationRepPassword] = useState(null)

    const [privacyPolice, setPrivacyPolice] = useState(false)
    const [userAgreement, setUserAgreement] = useState(false)

    const [popup, setPopup] = useState(null)

    const handlePrivacyPoliceChecked = () => {
        setPrivacyPolice(!privacyPolice)
    }

    const handleUserAgreementChecked = () => {
        setUserAgreement(!userAgreement)
    }

    const handleFormatPhoneNumber = (e) => {
        const numbers = e.target.value.replace(/\D/g, '').substring(0, 11)
        let formatted = ""
        if (numbers.length === 0) return ""
        
        formatted += "+"
        
        formatted += numbers.charAt(0) === "7" ? "7" : numbers.charAt(0)

        if (e.target.value === formatted) return ""
        formatted += " "
        
        if (numbers.length > 1) {
            formatted += "(" + numbers.substring(1, 4)
        }
        if (numbers.length > 4) {
            formatted += ") " + numbers.substring(4, 7)
        }
        if (numbers.length > 7) {
            formatted += " " + numbers.substring(7, 9)
        }
        if (numbers.length > 9) {
            formatted += "-" + numbers.substring(9, 11)
        }
        return formatted
    }

    const assembleData = () => {
        return {"email": registrationEmail,
                "name": registrationName,
                "secondName": registrationSecondName,
                "patronymic": registrationPatronymic,
                "phoneNumber": phoneNumber, 
                "password": registrationPassword,
                registrationDate: getCurrentDate(),
                isPartnerProposal: location.pathname === routes.PARTNERSHIP_AUTHORIZATION,
        }
    }

    const sendCustomerData = async() => {
        const validResults = validData()
        if (validResults) {
            setPopup(validResults)
            return
        }
        try {
            const user = assembleData()
            const response = await registration(user)
            if (location.pathname !== routes.PARTNERSHIP_AUTHORIZATION) {
                setLoginToggle(true)
                setPopup(null)
                setRegistrationConfirm(true)
            } else {
                setPopup(null)
                setRegistrationConfirm(true)
                navigate(routes.AUTORIZATION)
                setLoginToggle(true)
            }
        } catch (err) {
            setPopup("Ой, произошла непредвиденная ошибка!")
            console.log("Registration Failed", err)
        }
    }

    const validData = () => {
        const regex = /\S+@\S+\.\S+/
        if (!registrationEmail || !registrationName || !registrationSecondName || !registrationPassword || !registrationRepPassword) {
            return "Для регистрации заполните все поля!"
        }
        if (!regex.test(registrationEmail)) {
            return "Неверный формат почты!"
        }
        if (registrationPassword.length < 5) {
            return "Пароль должен быть более 5 символов!"
        }
        if (registrationPassword !== registrationRepPassword) {
            return "Пароли не совпадают!"
        }
        if (!privacyPolice || !userAgreement) {
            return "Перед регистрацией ознакомтесь с соглашениями!"
        }
        return null
    }

    return (
        <div className={`autorizationContainer ${!loginToggle ? "active" : location.pathname === routes.PARTNERSHIP_AUTHORIZATION ? "active" : ""}`}>
            <div className="loginContainerBack">
                <Button key={"registrationTitleButton0"}
                        buttonText={"Назад на главную"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.HOME)}/>
            </div>
            <div className={`registrationContainer`}>
                <div className={`loginContainerPopup ${popup !== null ? "popupActive" : ""}`}>{popup}</div>
                {popup === null &&
                <h2>{location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ? "Регистрация" : "Регистрация для партнеров"}</h2>}
                <div className="registrationContainerImage">
                    {popup === null &&
                    <div className="registrationContainerImageBlur"></div>}
                    <img src="https://img.freepik.com/premium-photo/people-generating-images-using-artificial-intelligence-laptop_23-2150794312.jpg?w=1380"></img>
                </div>
                <div className="registrationContainerInputs">
                    <InputField key={"registrationInput0"}
                                inputType={"text"}
                                inputValue={registrationEmail}
                                inputPlaceholder={"Электронная почта"}
                                inputOnChange={(e)=>{setRegistrationEmail(e.target.value)}}/>
                                
                    <InputField key={"registrationInput2"}
                                inputType={"text"}
                                inputValue={registrationSecondName}
                                inputPlaceholder={"Фамилия"}
                                inputOnChange={(e)=>{setRegistrationSecondName(e.target.value)}}/>

                    <InputField key={"registrationInput1"}
                                inputType={"text"}
                                inputValue={registrationName}
                                inputPlaceholder={"Имя"}
                                inputOnChange={(e)=>{setRegistrationName(e.target.value)}}/>
                                
                    {location.pathname === routes.PARTNERSHIP_AUTHORIZATION && <>
                    <InputField key={"registrationInput5"}
                                inputType={"text"}
                                inputValue={registrationPatronymic}
                                inputPlaceholder={"Отчество"}
                                inputOnChange={(e)=>{setRegistrationPatronymic(e.target.value)}}/>

                    <InputField key={"registrationInput6"}
                                inputType={"text"}
                                inputValue={phoneNumber}
                                inputPlaceholder={"Номер телефона"}
                                inputOnChange={(e)=>{const formatted = handleFormatPhoneNumber(e)
                                                     setPhoneNumber(formatted)}}/></>}
                                
                    <InputField key={"registrationInput3"}
                                inputType={"password"}
                                inputValue={registrationPassword}
                                inputPlaceholder={"Пароль"}
                                inputOnChange={(e)=>{setRegistrationPassword(e.target.value)}}/>
                                
                    <InputField key={"registrationInput4"}
                                inputType={"password"}
                                inputValue={registrationRepPassword}
                                inputPlaceholder={"Повторите пароль"}
                                inputOnChange={(e)=>{setRegistrationRepPassword(e.target.value)}}/>
                </div>

                    
                <div className="documentsCheckContainer">
                    <div className="documentsCheck">
                        <Checkbox key={"registrationCheckbox0"}
                                checkboxText={"Принять"}
                                checkboxChecked={privacyPolice}
                                checkboxOnChange={handlePrivacyPoliceChecked}/>
                        <Button key={"registrationButton2"}
                                buttonText={"политику конфиденциальности"}
                                buttonType={"link"}
                                buttonFunc={()=>window.open(routes.PRIVACY_POLICE, "_blank")}/>
                    </div>
                    
                    <div className="documentsCheck">
                        <Checkbox key={"registrationCheckbox1"}
                                checkboxText={"Принять"}
                                checkboxChecked={userAgreement}
                                checkboxOnChange={handleUserAgreementChecked}/>
                        <Button key={"registrationButton2"}
                                buttonText={"пользовательское соглашение"}
                                buttonType={"link"}
                                buttonFunc={()=>window.open(routes.USER_AGREEMENT, "_blank")}/>
                    </div>

                </div>

                <div className="orContainer">
                    <Button key={"registrationButton0"}
                            buttonText={"Регистрация"}
                            buttonType={`${(privacyPolice && userAgreement) ? "" : "block"}`}
                            buttonWidth={"100%"}
                            buttonFunc={sendCustomerData}/>

                    {location.pathname !== routes.PARTNERSHIP_AUTHORIZATION && <>
                    <div className="dividerContainer">
                        <div className="hl"></div>
                        <p>или</p>
                        <div className="hl"></div>
                    </div>
                    
                    <Button key={"registrationButton1"}
                            buttonText={"Войти в аккаунт"}
                            buttonWidth={"100%"}
                            buttonFunc={handleToggle}/></>}
                </div>
            </div>

            <div className="partnerContainer">
                {location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ? 
                <Button key={"registrationButtonPartner1"}
                        buttonText={"Хотите стать нашим партнером?"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.PARTNERSHIP_AUTHORIZATION)}/> : 
                <Button key={"registrationButtonPartner2"}
                        buttonText={"Хочу быть обычным пользователем!"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.AUTORIZATION)}/>}
            </div>
        </div>
    )
}