import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { paymentStatus } from "../../modules/api_modules/paymentAPI"
import { Button } from "../reusible_components/Button"
import routes from "../../routes"

export const PaymentRedirect = () => {
    const navigate = useNavigate()
    const [result, setResult] = useState(null)
    useEffect(()=>{
        checkPaymentStatus()
    }, [])
    const checkPaymentStatus = async () => {
        const response = await paymentStatus(localStorage.getItem("token"))
        console.log(response)
        if (response.status === 200) setResult("Платеж успешно прошел")
    }
    return(
        <>
            {result && <p style={{color:"green", padding:"5px"}}>{result}</p>}
            <Button buttonText={"Назад"} buttonPadding="5px 15px" buttonFunc={()=> {navigate(routes.PRICING)}}/>
        </>
    )
}