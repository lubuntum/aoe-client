import { useState } from "react"

const PsdStrengthContainer = ({psdStyle}) => {
    return (<div className={`passwordStrength`}></div>)
}

export const RecoverPass = () => {
    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [psdStrength, setPsdStrength] = useState("colorStrength")
    //Событие клика
    const changePass = ()=>{
        console.log(pass, repeatPass)
        //Сравнивать пароле при клике
        //Сложность пароля 
    }
    //Событие ввода пароля и проверка сложности + изменение цвета
    const psdStrengthCheck = (passValue, valueChaneFn) => {
        //Вызвать функцию из module
        //const colorStyle = checkPsdStrength(passValue)
        //setPsdStrength(colorStyle)
        //setPass(passValue)
        valueChaneFn(passValue)
        console.log(passValue)
    }
    return (<>
    <div className="accountRecoverPassCardWrapper">
        <p className="accountRecoverPassCardTitle">Сброс пароля</p>
        <div className="horizontalDivider"></div>
        <div className="accountRecoverPassCardInputs">
            <div className="inputContainer">
                <input type="password" placeholder="Старый пароль" required></input>
                <div className="passwordStrength" style={{display: "none"}}></div>
            </div>
            <div className="inputContainer">
                <input type="password" placeholder="Новый пароль" required onChange={(e)=>{psdStrengthCheck(e.target.value, setPass)}}></input>
                <PsdStrengthContainer psdStyle = {psdStrength}/>
            </div>
            <div className="inputContainer">
                <input type="password" placeholder="Повторите пароль" required onChange={(e)=>{psdStrengthCheck(e.target.value, setRepeatPass)}}></input>
                <div className="passwordStrength"></div>
            </div>
            <div className="inputError">Error</div>
            <a className="btn" style={{width: "100%"}} onClick={() => {changePass()}}>Обновить пароль</a>
        </div>
    </div>
    </>)
}