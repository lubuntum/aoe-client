import { useEffect, useState } from "react"
import { addBalanceToCustomer, getCustomerIdByEmail } from "../../../modules/api_modules/pricingAPI"
import { Button } from "../../reusible_components/Button"
import { useDebounce } from "../../../hooks/debounce/useDebounce"

export const AdminPricing = () => {
    const [email, setEmail] = useState("")
    const [amount, setAmount] = useState("")
    const [customerId, setCustomerId] = useState("")

    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)
    const debounceEmail = useDebounce(email, 1000)
    useEffect(()=>{
        if (debounceEmail){
            checkCustomerByEmail()
        }
    }, [debounceEmail])

    const checkCustomerByEmail = async () => {
        try {
            const response = await getCustomerIdByEmail(debounceEmail, localStorage.getItem("token"))
            setCustomerId(response.data)
            setError(null)
            setStatus(`Пользователь ${email} найден`)
        }catch(e){
            setError("Пользователь не найден")
            setStatus(null)
        }
    }
    const addAmount = async () => {
        try{
            const response = await addBalanceToCustomer(customerId, amount, localStorage.getItem("token"))
            if(!response.data) {
                setError("Ошибка при добавлении суммы")
                return
            }
            setStatus(`Сумма ${amount} добавлена к счету ${email}`)
            setError(null)
        } catch(e) {
            setError("Ошибка при добавлении суммы")
            setStatus(null)
        }
    }
    return (<>
        {error && <div style={{color:"red"}}>{error}</div>}
        {status && <div style={{color:"green"}}>{status}</div>}
        <input  type="text" placeholder="Электронная почта" required onChange={e => setEmail(e.target.value)} />
        <input type="numeric" placeholder="Кол-во рублей" required onChange={e => setAmount(e.target.value)} />
        <Button buttonText={"Зачислить"} buttonFunc={addAmount}/>

    </>)
}