import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { serverLogin } from "../../modules/api_modules/authAPI"
import { InputField } from "../reusible_components/InputField"
import { Button } from "../reusible_components/Button"
import { useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"
import { Checkbox } from "../reusible_components/Checkbox"
import { encryptData } from "../../modules/crypto_modules/cryptoData"
import { decryptData } from "../../modules/crypto_modules/cryptoData"

export const LoginContainer = ({handleToggle, loginToggle, setLoginToggle, registrationConfirm}) => {
    const navigate = useNavigate()
    const location = useLocation()

    const [loginEmail, setLoginEmail] = useState(null)
    const [loginPassword, setLoginPassword] = useState(null)

    const { login } = useAuth()
    const { saveEmail } = useAuth()

    const [remeberMe, setRemeberMe] = useState(false)

    const [popup, setPopup] = useState(null)

    const handleRemberMe = () => {
        const newValue = !remeberMe
        setRemeberMe(newValue)
        if (!newValue) {
            localStorage.removeItem("rememberedCred")
        }
    }

    useEffect(() => {
        const savedCred = localStorage.getItem("rememberedCred")
        if (savedCred) {
            try {
                const decrypted = decryptData(savedCred)
                if (decrypted) {
                    setLoginEmail(decrypted.email)
                    setLoginPassword(decrypted.password)
                    setRemeberMe(true)
                }
            } catch (err) {
                console.error("Failed to decrypt cred", err)
                localStorage.removeItem("rememberedCred")
            }
        }
    }, [remeberMe, setRemeberMe])

    useEffect(() => {
        if (registrationConfirm) {
            setPopup("Регистрация успешна! Мы отправили вам сообщение на почту для подтверждения аккаунта!")
        }
    }, [registrationConfirm])

    useEffect(() => {
        setLoginToggle(true)
    }, [setLoginToggle])

    const collectDataByToken = async(token) => {
        saveEmail(loginEmail)
        login(token)
    }

    const handleSubmit = async(e) => {
        if (!loginEmail || !loginPassword) {
            setPopup("Введите почту и пароль для входа в аккаунт!")
            return
        }
        try {
            const response = await serverLogin(loginEmail, loginPassword)
            if (remeberMe) {
                const cred = { email: loginEmail, password: loginPassword }
                const encrypted = encryptData(cred)
                localStorage.setItem("rememberedCred", encrypted)
            } else {
                localStorage.removeItem("rememberedCred")
            }
            collectDataByToken(response.data.token)
        } catch(err) {
            if(err && err.status === 403){
                setPopup("Пожалуйста подтвердите почту")
                return
            }
            setPopup("Неверный логин или пароль. Попробуйте снова!")
            console.error("Login Failed", err)
        }
    }

    return (
        <div className={`autorizationContainer ${loginToggle ? "active" : ""}`}>
            <div className="loginContainerBack">
                <Button key={"loginTitleButton0"}
                        buttonText={"Назад на главную"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.HOME)}/>
            </div>
            <div className={`loginContainer`}>
                <div className={`loginContainerPopup ${popup !== null ? "popupActive" : ""} ${(registrationConfirm) ? "popupGood" : ""}`}>{popup}</div>
                {popup === null &&
                <h2>TestMy<span>Eng</span></h2>}
                <div className="loginContainerImage">
                    {popup === null &&
                    <div className="loginContainerImageBlur"></div>}
                    <img src="https://img.freepik.com/premium-photo/people-generating-images-using-artificial-intelligence-laptop_23-2150794312.jpg?w=1380"></img>
                </div>
                <div className="loginContainerInputs">
                    <InputField key={"loginInput0"}
                                inputType={"text"}
                                inputValue={loginEmail}
                                inputPlaceholder={"Электронная почта"}
                                inputOnChange={(e)=>{setLoginEmail(e.target.value)}}/>

                    <InputField key={"loginInput1"}
                                inputType={"password"}
                                inputValue={loginPassword}
                                inputPlaceholder={"Пароль"}
                                hideIndicator={true}
                                inputOnChange={(e)=>{setLoginPassword(e.target.value)}}/>
                </div>
                            
                <div className="forgetContainer">
                    <Checkbox key={"loginCheckbox0"}
                              checkboxText={"Запомнить меня!"}
                              checkboxChecked={remeberMe}
                              checkboxOnChange={handleRemberMe}/>

                    <Button key={"loginButton0"}
                            buttonType={"link"}
                            buttonText={"Забыли пароль?"}
                            buttonFunc={()=>(console.log(loginEmail, loginPassword))}/>
                </div>
                <div className="orContainer">
                    <Button key={"loginButton1"}
                            buttonText={"Войти"}
                            buttonWidth={"100%"}
                            buttonFunc={handleSubmit}/>

                    <div className="dividerContainer">
                        <div className="hl"></div>
                        <p>или</p>
                        <div className="hl"></div>
                    </div>

                    <Button key={"loginButton2"}
                            buttonText={"Создать аккаунт"}
                            buttonWidth={"100%"}
                            buttonFunc={handleToggle}/>
                </div>
            </div>

            <div className="partnerContainer">
                {location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ? 
                <Button key={"registrationButtonPartner1"}
                        buttonText={"Хотите стать нашим партнером?"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.PARTNERSHIP_AUTHORIZATION)}/> : 
                <Button key={"registrationButtonPartner2"}
                        buttonText={"Хочу быть обычным пользователем?"}
                        buttonType={"link"}
                        buttonFunc={()=>navigate(routes.AUTORIZATION)}/>}
            </div>
        </div>
    )
}