import { useState } from "react"
import { checkPsdStrength } from "../../modules/psdStrength/checkPsdStrength"

const PsdStrengthContainer = ({psdStyle}) => {
    return (<div className={`passwordStrength ${psdStyle}`}></div>)
}

export const RecoverPass = () => {
    //Сами пароли
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    //Индикатор пароля стиль
    const [psdStrength, setPsdStrength] = useState("")
    const [psdRepeatStrength, setPsdRepeatStrength] = useState("")

    const [error, setError] = useState('')
    //Событие клика смены пароля
    const changePass = ()=>{
        if(!(pass === repeatPass)) console.error("Пароли не равны")
        if(pass.length < 5) console.error("Длинна смол")
    }
    //Событие ввода пароля и проверка сложности + изменение цвета
    const psdStrengthCheck = (passValue, valueChangeFn, psdStrengthStyle) => {
        //Вызвать функцию из module
        const colorStyle = checkPsdStrength(passValue)
        psdStrengthStyle(colorStyle)
        valueChangeFn(passValue)
    }
    return (<>
    <div className="accountRecoverPassCardWrapper">
        <div className="cardTitle">
            <p className="accountRecoverPassCardTitle">Сброс пароля</p>
            <div className="horizontalDivider"></div>
        </div>
        <div className="accountRecoverPassCardInputs">
            <div className="inputContainer">
                <input className="customInput" type="password" placeholder="Старый пароль" required></input>
                <div className="passwordStrength" style={{display: "none"}}></div>
            </div>
            <div className="inputContainer">
                <input className="customInput" type="password" placeholder="Новый пароль" required onChange={(e)=>{psdStrengthCheck(e.target.value, setPass, setPsdStrength)}}></input>
                <PsdStrengthContainer psdStyle = {psdStrength}/>
            </div>
            <div className="inputContainer">
                <input className="customInput" type="password" placeholder="Повторите пароль" required onChange={(e)=>{psdStrengthCheck(e.target.value, setRepeatPass, setPsdRepeatStrength)}}></input>
                <PsdStrengthContainer psdStyle = {psdRepeatStrength}/>
            </div>
            <a className="btn" style={{width: "100%"}} onClick={() => {changePass()}}>Обновить пароль</a>
        </div>
    </div>
    </>)
}