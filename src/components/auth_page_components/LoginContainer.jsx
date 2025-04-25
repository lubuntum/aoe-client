import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { serverLogin } from "../../modules/api_modules/authAPI"

import { NewInput } from "../reusible_components/NewInput"
import { NewButton } from "../reusible_components/NewButton"
import { NewCheckbox } from "../reusible_components/NewCheckbox"

import { encryptData } from "../../modules/crypto_modules/cryptoData"
import { decryptData } from "../../modules/crypto_modules/cryptoData"

import authStatuses from "../../modules/auth_modules/authStatuses"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const LoginContainer = ({onChangeContent, handleReturnHome, setNotification}) => {
    const { login } = useAuth()
    const { saveEmail } = useAuth()

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
                console.error("Failed to decrypt cred", err)
                localStorage.removeItem("savedCred")
            }
        }
    }, [rememberMe, setRememberMe])

    const collectDataByToken = async(token) => {
        saveEmail(loginEmail)
        login(token)
    }

    const handleSubmit = async() => {
        if (!loginEmail || !loginPassword) {
            setNotification(authStatuses.ERROR_LOGIN_FIELDS_ARE_EMPTY)
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
                setNotification(authStatuses.ERROR_EMAIL_CONFIRMATION)
                return
            }
            setNotification(authStatuses.ERROR_WRONG_EMAIL_OR_PASS)
        }
    }

    return (<>
        <div className="authContentBackHome" onClick={() => handleReturnHome()}>
            <CloseThinIcon className="svgIcon"/>
        </div>

        <div className="authContentTitle">
            <p>Welcome back!</p>
        </div>

        <div className="authContentInputs">
            <NewInput key={"loginInput0"}
                      inputValue={loginEmail}
                      inputType={"text"}
                      inputPlaceholder={"электронная почта"}
                      inputOnChange={(e) => {setLoginEmail(e.target.value)}}/>

            <NewInput key={"loginInput1"}
                      inputType={"password"}
                      inputValue={loginPassword}
                      inputPlaceholder={"пароль"}
                      inputOnChange={(e) => {setLoginpassword(e.target.value)}}/>
        </div>


        <div className="authContentOptions">
            <NewCheckbox key={"loginCheckbox0"}
                         text={"Запомнить меня!"}
                         checkboxChecked={rememberMe}
                         checkboxOnChange={handleRememberMe}
                         checkboxId={"rememberMeCheckbox"}/>

            <NewButton key={"loginButton0"}
                       buttonType={"link"}
                       buttonText={"Забыли пароль?"}
                       buttonFunc={() => onChangeContent(4)}/>
        </div>

        <div className="authContentButtons">
            <NewButton key={"loginButton1"}
                       buttonText={"Войти"}
                       buttonWidth={"100%"}
                       buttonFunc={handleSubmit}/>

            <div className="authContentCreateAccount">
                <p>еще нет аккаунта?</p>
                <NewButton key={"loginButton2"}
                           buttonType={"link"}
                           buttonText={"Создать аккаунт"}
                           buttonFunc={() => onChangeContent(2)}/>
            </div>

            <NewButton key={"loginButton3"}
                       buttonType={"link"}
                       buttonText={"Хочу стать партнером!"}
                       buttonFunc={() => {onChangeContent(3)}}/>
        </div>
    </>)
}