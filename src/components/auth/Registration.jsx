import { useState } from "react"

export const Registration = () => {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [secondName, setSecondName] = useState("");
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")

    const [error, setError] = useState()
    const validatePassword = () => {
        if(password !== repeatPassword){
            setError("Пароли не совпали")
            return false
        }
        if(password.length < 5) {
            setError("Пароль слишком короткий")
            return false
        }
        return true
    }
    const validateEmail = () => {
        const regex = /\S+@\S+\.\S+/
        if(!regex.test(email)){
            setError("Некорректная почта")
            return false;
        }
        return true;
    }
    
    const sendCustomerData = () => {
        if (!validateEmail() && !validatePassword()) return

    }
    return (
        <>
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