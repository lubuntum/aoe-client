import { useState } from "react"
import { registration } from "../../modules/api_modules/authAPI"
import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { useLocation, useNavigate } from "react-router-dom";
import { checkPsdStrength } from "../../modules/password_modules/checkPasswordStrength"
import { CheckPsdStrength } from "../utils/CheckPsdStrength"

import routes from "../../routes";
import { Checkbox } from "../reusible_components/Checkbox";

export const PsdStrengthContainer = ({psdStyle}) => {
    return (<div className={`passwordStrength ${psdStyle}`}></div>)
}

export const Registration = ({toggle, disabledButton, setPanelToggle}) => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("");
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const location = useLocation()

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }
    const handleRepPassChange = (e) => {
        setRepeatPass(e.target.value)
    }

    const [error, setError] = useState()
    const [status, setStatus] = useState()
    const navigate = useNavigate()
    
    const validateInputs = () => {
        const regex = /\S+@\S+\.\S+/
        if (!email || !name || !secondName || !pass || !repeatPass)
            return "Заполните все поля"
        if (!regex.test(email))
            return "Неверный формат почты"
        if (pass.length < 5)
            return "Пароль слишком короткий"
        if (pass !== repeatPass)
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
            console.log(user)
            const response = await registration(user)
            setStatus(response.data)
            setError(null)
            setPanelToggle(true)
        } catch (err) {
            err.response ? setError(err.response.data.error) : setError("Ой, непредвиденная ошибка")
        } 
    }

    const assembleUserData = () => {
        //const username = email.split("@")[0];
        return {"email" : email, "name" : name, 
                "secondName": secondName, "password":pass,
                 registrationDate: getCurrentDate(), 
                 isPartnerProposal: location.pathname === routes.PARTNERSHIP_AUTHORIZATION}
    }

    return (<>
        <p className="registrationTitle">{location.pathname === routes.PARTNERSHIP_AUTHORIZATION ? "Регистрация партнеров" : "Регистрация"}</p>
        {error && <p style={{color:"red"}}>{error}</p>}
        {status && <p style={{color: "green"}}>{status}</p>}
        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="text" 
                    value={email} 
                    placeholder="Электронная почта" 
                    id="email"
                    required 
                    onChange={(e)=>{setEmail(e.target.value)}}></input>
        </div>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="text" 
                    value={name} 
                    placeholder="Имя" 
                    id="name"
                    required 
                    onChange={(e)=>{setName(e.target.value)}}></input>
        </div>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="text" 
                    value={secondName} 
                    placeholder="Фамилия" 
                    id="secondName"
                    required 
                    onChange={(e)=>{setSecondName(e.target.value)}}></input>
        </div>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="password" 
                    value={pass} 
                    placeholder="Пароль" 
                    id="password"
                    required
                    onChange={handlePassChange}></input>
               <CheckPsdStrength psdStrengthStyle = {checkPsdStrength(pass)}/>
        </div>

        <div className="defInpContainer" style={{width: "350px"}}>
            <input className="defInp" 
                    type="password" 
                    value={repeatPass} 
                    placeholder="Повторите пароль" 
                    id="repeatPassword"
                    required 
                    onChange={handleRepPassChange}></input>
                <CheckPsdStrength psdStrengthStyle = {checkPsdStrength(repeatPass)}/>
        </div>
        
        <a className="btn defaultBtn" onClick={sendCustomerData} style={{width: "350px"}}>Регистрация</a>

        <div className="orContainer">
            <div className="hr"></div>
            <p>или</p>
            <div className="hr"></div>
        </div>

        <a className="btn defaultBtn" onClick={toggle} disabled={disabledButton} style={{width: "350px"}}>Войти в аккаунт</a>
    </>)
}