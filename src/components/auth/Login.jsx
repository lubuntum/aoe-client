import { useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { serverLogin } from "../../modules/api_modules/authAPI"

export const Login = ({toggle, disabledButton}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {login} = useAuth()
    const {saveEmail, getEmail} = useAuth()

    const [isChecked, setIsChecked] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //const response = {data : {'username':username, 'token':"test"}} //await serverLogin(username, password)
            console.log(`${email} ${password}`)
            const response = await serverLogin(email, password)
            collectDataByToken(response.data.token)
        } catch(error) {
            if (error.response) setError(error.response.data.error)
            console.error("Login failed", error)
        }
    }

    const collectDataByToken = async (token) =>{
        saveEmail(email)
        login(token)
    }

    return (<>
        <p className="loginTitle">Service</p>

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
            <label className="defCheckboxContainer">
                <input type="checkbox" onChange={() => {
                    setIsChecked(!isChecked)
                }}></input>
                <span className={`checkbox ${isChecked ? "checkboxAcitve" : "checkboxDisable"}`} aria-hidden="true"></span>
                Запомнить меня!
            </label>

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