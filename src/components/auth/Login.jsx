import { useState } from "react"
import { useAuth } from "../../modules/auth/AuthProvider"
import { serverLogin } from "../../modules/auth/AuthAPI"

export const Login = ({toggle, disabledButton}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {login} = useAuth()
    const {saveUsername, getUsername} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //const response = {data : {'username':username, 'token':"test"}} //await serverLogin(username, password)
            const response = await serverLogin(username, password)
            collectDataByToken(response.data.token)
        } catch(error) {
            if (error.response) setError(error.response.data.error)
            console.error("Login failed", error)
        }
    }

    const collectDataByToken = async (token) =>{
        //Заглушка получения данных по токену аутендификации
        saveUsername(username)
        login(token)
    }

    return (<>
        <p className="loginTitle">Service</p>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="text" 
                    value={username} 
                    placeholder="Электронная почта" 
                    required 
                    onChange={(e)=>{setUsername(e.target.value)}}></input>
        </div>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="password" 
                    value={password} 
                    placeholder="Пароль" 
                    required 
                    onChange={(e) => {setPassword(e.target.value)}}></input>
        </div>

        <div className="rememberForgetContainer">
            <a>Запомнить меня</a>
            <a onClick={() => {}}>Забыли пароль?</a>
        </div>

        <a className="btn" onClick={handleSubmit} style={{width: "350px"}}>Войти</a>

        <div className="orContainer">
            <div className="hr"></div>
            <p>или</p>
            <div className="hr"></div>
        </div>

        <a className="btn" onClick={toggle} disabled={disabledButton} style={{width: "350px"}}>Создать аккаунт</a>
    </>)
}