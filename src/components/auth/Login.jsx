import { useState } from "react"
import {useAuth} from "../../modules/auth/AuthProvider"
const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const {login} = useAuth()
    const {saveUsername, getUsername} = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            //Заглушка
            setTimeout(()=>{
                if(username == 'userTest' && password == 'pass')
                    collectDataByToken('testToken')
            }, 1000)
        } catch (err){
            setError(err.message)
        }
    }
    const collectDataByToken = async (token) =>{
        //Заглушка получения данных по токену аутендификации
        const userData = {username : "userTest", subscribtionPlan:"free"}
        saveUsername(userData.username)
        login(token)
    }

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Логин" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                <input type="password" placeholder="Пароль" value={password} onChange={(e) => {setPassword(e.target.value)}}/>
                <button type="submit">Войти</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    )

}

export default Login