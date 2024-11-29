import { useState } from "react"
import { registration } from "../../modules/auth/AuthAPI";
import { getCurrentDate } from "../../modules/date/currentDate";
import { useNavigate } from "react-router-dom";
import { checkPsdStrength } from "../../modules/psdStrength/checkPsdStrength";

import routes from "../../routes";

export const PsdStrengthContainer = ({psdStyle}) => {
    return (<div className={`passwordStrength ${psdStyle}`}></div>)
}

export const Registration = ({toggle, disabledButton}) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("");

    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [psdStrength, setPsdStrength] = useState("")
    const [psdRepeatStrength, setPsdRepeatStrength] = useState("")

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

    const psdStrengthCheck = (passValue, valueChangeFn, psdStrengthStyle) => {
        const colorStyle = checkPsdStrength(passValue)
        psdStrengthStyle(colorStyle)
        valueChangeFn(passValue)
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

    return (<>
        <p className="registrationTitle">Регистрация</p>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="text" 
                    value={email} 
                    placeholder="Электронная почта" 
                    id="email"
                    required 
                    onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="text" 
                    value={name} 
                    placeholder="Имя" 
                    id="name"
                    required 
                    onChange={(e)=>{setName(e.target.value)}}></input>
        </div>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="text" 
                    value={secondName} 
                    placeholder="Фамилия" 
                    id="secondName"
                    required 
                    onChange={(e)=>{setSecondName(e.target.value)}}></input>
        </div>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="password" 
                    value={password} 
                    placeholder="Пароль" 
                    id="password"
                    required 
                    onChange={(e)=>{setPassword(e.target.value)}}></input>
                <PsdStrengthContainer psdStyle = {psdStrength}/>
        </div>

        <div className="inputContainer" style={{width: "350px"}}>
            <input className="customInput" 
                    type="password" 
                    value={repeatPassword} 
                    placeholder="Повторите пароль" 
                    id="repeatPassword"
                    required 
                    onChange={(e)=>{setRepeatPassword(e.target.value)}}></input>
                <PsdStrengthContainer psdStyle = {psdRepeatStrength}/>
        </div>

        <a className="btn" onClick={sendCustomerData} style={{width: "350px"}}>Регистрация</a>

        <div className="orContainer">
            <div className="hr"></div>
            <p>или</p>
            <div className="hr"></div>
        </div>

        <a className="btn" onClick={toggle} disabled={disabledButton} style={{width: "350px"}}>Войти в аккаунт</a>
    </>)
}