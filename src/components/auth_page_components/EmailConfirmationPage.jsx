import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import { Loader } from "../reusible_components/Loader"
import "./css/email_confirmation_page.css"
import { confirmCustomerEmailRequest } from "../../modules/api_modules/emailAPI"
const statuses = {
    IDLE:"IDLE",
    SUCCESS:"SUCCESS",
    ERROR:"ERROR"
}
export const EmailConfirmationPage = () => {
    const [token, setToken] = useState(null)
    const [status, setStatus] = useState(statuses.IDLE)
    const location = useLocation()

    useEffect(()=>{
        const queryParams = new URLSearchParams(location.search)
        if (!queryParams.get("token")){
            setStatus(statuses.ERROR)
            return
        }
        confirmCustomerEmail(queryParams.get("token"))
    }, [])

    const confirmCustomerEmail = async(token) => {
        try {
            const response = await confirmCustomerEmailRequest(token)
            setStatus(statuses.SUCCESS)
        } catch(err) {
            if(err && err.response)
                console.error(err.response.data.message)
            setStatus(statuses.ERROR)
        }
        
    }

    return (
        <div className="statusWrapper">
            {status === statuses.IDLE && <Loader/>}
            {status === statuses.ERROR && <p className="errorStatus">Some error occurred</p>}
            {status === statuses.SUCCESS && <p className="successStatus">Your email successfully confirmed, now you can freely enter to your account</p>}
        </div>
    )
}