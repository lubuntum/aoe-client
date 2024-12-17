import { useState } from "react"
import { checkPsdStrength } from "../../../modules/psdStrength/checkPsdStrength.js"
import { CheckPsdStrength } from "../../utils/CheckPsdStrength.jsx"

export const UserPassword = () => {

    const [pass, setPass] = useState("")
    const [repeatPass, setRepeatPass] = useState("")
    const [oldPass, setOldPass] = useState("")

    const handlePassChange = (e) => {
        setPass(e.target.value)
    }
    const handleRepPassChange = (e) => {
        setRepeatPass(e.target.value)
    }
    const handleOldPassChange = (e) => {
        setOldPass(e.target.value)
    }

    //Событие клика смены пароля
    const changePass = ()=>{
        if(!(pass === repeatPass)) console.error("Пароли не равны")
        if(pass.length < 5) console.error("Длинна смол")
    }

    return (<>
        <div className="userPasswordContainer gridItem4">
            <p>Сменить пароль</p>

            <div className="changePasswordsContainer">
                <div className="newPasswordContainer">
                    <div className="defInpContainer">
                        <input className="defInp" 
                               type="password" 
                               placeholder="Новый пароль" 
                               required 
                               value={pass} 
                               onChange={handlePassChange}></input>
                        <CheckPsdStrength psdStrengthStyle = {checkPsdStrength(pass)}/>
                    </div>

                    <div className="defInpContainer">
                        <input className="defInp"
                               type="password" 
                               placeholder="Повторите пароль" 
                               required 
                               value={repeatPass} 
                               onChange={handleRepPassChange}></input>
                        <CheckPsdStrength psdStrengthStyle = {checkPsdStrength(repeatPass)}/>
                    </div>
                </div>

                <div className="oldPasswordContainer">
                    <div className="defInpContainer">
                        <input className="defInp"
                               type="password" 
                               placeholder="Старый пароль" 
                               required 
                               value={oldPass}
                               onChange={handleOldPassChange}></input>
                    </div>

                    <a className="btn defaultBtn" style={{width: "100%"}} onClick={() => {changePass()}}>Применить</a>
                </div>
            </div>
        </div>
    </>)
}