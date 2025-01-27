import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { serverLogin } from "../../modules/api_modules/authAPI"
import { Checkbox } from "../reusible_components/Checkbox"
import { useLocation } from "react-router-dom"
import routes from "../../routes"

export const Login = ({toggle, disabledButton}) => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [rememberMe, setRememberMe] = useState(false)
    const [error, setError] = useState(null)
    const location = useLocation()

    const {login} = useAuth()
    const {saveEmail, getEmail} = useAuth()

    useEffect(() => {
        const savedEmail = localStorage.getItem("savedEmail")
        const savedPassword = localStorage.getItem("savedPassword")
        const savedRemember = localStorage.getItem("savedRemember") === "true"

        if (savedRemember) {
            setEmail(savedEmail)
            setPassword(savedPassword)
            setRememberMe(savedRemember)
        }
    }, [])

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            setError("Введите почту и пароль")
            return
        }
        try {
            const response = await serverLogin(email, password)
            collectDataByToken(response.data.token)
            setError(null)
        } catch(error) {
            setError("Неверный логин или пароль")
            console.error("Login failed", error)
        }

        if (rememberMe) {
            localStorage.setItem("savedEmail", email)
            localStorage.setItem("savedPassword", password)
            localStorage.setItem("savedRemember", "true")
        } else {
            localStorage.removeItem("savedEmail")
            localStorage.removeItem("savedPassword")
            localStorage.setItem("savedRemember", "false")
        }
    }

    const collectDataByToken = async (token) =>{
        saveEmail(email)
        login(token)
    }

    return (<>
        {error && <p>{error}</p>}
        <p className="loginTitle">{location.pathname === routes.PARTNERSHIP_AUTHORIZATION ? "Our partners" : "TestMyEng"}</p>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="text" 
                    value={email} 
                    placeholder="Электронная почта" 
                    required 
                    onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="password" 
                    value={password} 
                    placeholder="Пароль" 
                    required 
                    onChange={(e) => {setPassword(e.target.value)}}></input>
        </div>

        <div className="rememberForgetContainer">
            <Checkbox checkboxText={"Запомнить меня!"} checkboxChecked={rememberMe} checkboxOnChange={handleRememberMe}/>

            <a className="linkBtn" onClick={() => {}}>Забыли пароль?</a>
        </div>

        <a className="btn defaultBtn" onClick={handleSubmit} style={{width: "350px"}}>Войти</a>

        <div className="orContainer">
            <div className="hr"></div>
            <p>или</p>
            <div className="hr"></div>
        </div>

        <a className="btn defaultBtn" onClick={toggle} disabled={disabledButton} style={{width: "350px"}}>Создать аккаунт</a>
    </>)
}