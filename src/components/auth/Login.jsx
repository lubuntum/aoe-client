import { useState } from "react"
import {useAuth} from "../../modules/auth/AuthProvider"
import { serverLogin } from "../../modules/auth/AuthAPI"
import Header from '../header/Header';
import "./login.css"
const Login = () => {
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

    return (
        <>
        <Header/>
        <div className="login-container">
            {error && 
                <div className="error-container">
                    <p>{error}</p>
                </div>
            }
            
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Логин" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">Войти</button>
            </form>
        </div>
        </>

    )

}

export default Login