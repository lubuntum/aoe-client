import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { serverLogin } from "../../modules/api_modules/authAPI"
import { InputField } from "../reusible_components/InputField"
import { Button } from "../reusible_components/Button"
import { Checkbox } from "../reusible_components/Checkbox"
import { encryptData } from "../../modules/crypto_modules/cryptoData"
import { decryptData } from "../../modules/crypto_modules/cryptoData"
import authStatuses from "../../modules/auth_modules/authStatuses"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"

export const LoginContainer = ({onChangeContent, handleReturnHome, setAuthorizationStatus}) => {
    const { login } = useAuth()
    const { saveEmail } = useAuth()

    const navigate = useNavigate()

    const [loginEmail, setLoginEmail] = useState()
    const [loginPassword, setLoginpassword] = useState()
    const [rememberMe, setRememberMe] = useState(false)

    const handleRememberMe = () => {
        const newValue = !rememberMe
        setRememberMe(newValue)
        if (!newValue) { localStorage.removeItem("savedCred") }
    }

    useEffect(() => {
        const savedCred = localStorage.getItem("savedCred")
        if (savedCred) {
            try {
                const decrypted = decryptData(savedCred)
                if (decrypted) {
                    setLoginEmail(decrypted.email)
                    setLoginpassword(decrypted.password)
                    setRememberMe(true)
                }
            } catch (err) {
                console.log("Failed to decrypt cred", err)
                localStorage.removeItem("savedCred")
            }
        }
    }, [rememberMe, setRememberMe])

    const collectDataByToken = async(token) => {
        saveEmail(loginEmail)
        login(token)
    }

    const handleSubmit = async(e) => {
        if (!loginEmail || !loginPassword) {
            setAuthorizationStatus(authStatuses.ERROR_LOGIN_FIELDS_ARE_EMPTY)
            return
        }
        try {
            const response = await serverLogin(loginEmail, loginPassword)
            if (rememberMe) {
                const cred = { email: loginEmail, password: loginPassword }
                const encrypted = encryptData(cred)
                localStorage.setItem("savedCred", encrypted)
            } else {
                localStorage.removeItem("savedCred")
            }
            collectDataByToken(response.data.token)
        } catch (err) {
            if (err && err.status === 403) {
                setAuthorizationStatus(authStatuses.ERROR_EMAIL_CONFIRMATION)
                return
            }
            setAuthorizationStatus(authStatuses.ERROR_WRONG_EMAIL_OR_PASS)
        }
    }

    return (<>
        <div className="authorizationTitle">
            <p onClick={() => {handleReturnHome()}}>TestMy<span>Eng</span></p>
            <p>&gt;</p>
            <p>Вход</p>
        </div>
        <div className="loginContainerInputs">
            <InputField key={"loginInput0"}
                        inputType={"text"}
                        inputValue={loginEmail}
                        inputPlaceholder={"Электронная почта"}
                        inputOnChange={(e) => {setLoginEmail(e.target.value)}}/>

            <InputField key={"loginInput1"}
                        inputType={"password"}
                        inputValue={loginPassword}
                        inputPlaceholder={"Пароль"}
                        hideIndicator={true}
                        inputOnChange={(e) => {setLoginpassword(e.target.value)}}/>
        </div>
        <div className="loginContainerForget">
            <Checkbox key={"loginCheckbox0"}
                        checkboxText={"Запомнить меня!"}
                        checkboxChecked={rememberMe}
                        checkboxOnChange={handleRememberMe}/>

            <Button key={"loginButton0"}
                    buttonType={"link"}
                    buttonText={"Забыли пароль?"}
                    buttonFunc={() => onChangeContent(3)}/>
        </div>
        <div className="loginOrContainer">
            <Button key={"loginButton1"}
                    buttonText={"Войти"}
                    buttonWidth={"100%"}
                    buttonFunc={handleSubmit}/>
            
            <div className="loginContainerDivider">
                <div className="divider"></div>
                <p>или</p>
                <div className="divider"></div>
            </div>

            <Button key={"loginButton2"}
                    buttonText={"Создать аккаунт"}
                    buttonWidth={"100%"}
                    buttonFunc={() => onChangeContent(2)}/>

            <Button key={"loginButton3"}
                buttonText={"Хочу стать партнером!"}
                buttonType={"link"}
                buttonFunc={() => {navigate(routes.PARTNERSHIP_AUTHORIZATION)
                                   onChangeContent(2)}}/>
        </div>
    </>)
}