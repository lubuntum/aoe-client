import { useState } from "react"
import { registration } from "../../modules/auth/AuthAPI";
import { getCurrentDate } from "../../modules/date/currentDate";
import { useNavigate } from "react-router-dom";
import routes from "../../routes";

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    const validateInputs = () => {
        const regex = /\S+@\S+\.\S+/
        if (!email || !name || !secondName || !password || !repeatPassword)
            return "Заполните все поля"
        if (!regex.test(email))
            return "Неверный формат почты"
        if (password.length < 5)
            return "Пароль слишком короткий"
        if (password !== repeatPassword)
            return "Пароли не совпали"
        return null
    }
    const sendCustomerData = async () => {
        const validationResult = validateInputs()
        if (validationResult) {
            setError(validationResult)
            return
        }
        try {
            const user = assembleUserData()
            const response = await registration(user)
            setStatus(response.data)
            setError(null)
            navigate(routes.LOGIN)
        } catch (err) {
            if (err.response) setError(err.response.data.error)
        } 
    }
    const assembleUserData = () => {
        const username = email.split("@")[0];
        return {"email" : email, "name" : name, 
                "secondName": secondName, "username":username, "password":password,
                 registrationDate: getCurrentDate()}
    }
    return (
        <>
        {error && <p style={{backgroundColor:"red"}}>{error}</p>}
        {status && <p style={{backgroundColor:"lightgreen"}}>{status}</p>}
        <div onSubmit={sendCustomerData}  style={{display:"flex", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
            {error && <p style={{padding : '15px'}}>{error}</p>}
            <input type="text" placeholder="Почта" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <input type="text" placeholder="Имя" id="name" value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder="Фамилия" id="secondName" value={secondName} onChange={(e)=>setSecondName(e.target.value)}/>
            <input type="password" placeholder="Пароль" id="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <input type="password" placeholder="Повторите пароль" id="repeatPassword" value={repeatPassword} onChange={(e)=>setRepeatPassword(e.target.value)}/>
            <button onClick={()=>{sendCustomerData()}}>Регистрация</button>
        </div>
        </>
    )
}