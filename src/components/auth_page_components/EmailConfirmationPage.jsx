import "./css/autorization_page.css"
import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { confirmCustomerEmailRequest } from "../../modules/api_modules/emailAPI"
import authStatuses from "../../modules/auth_modules/authStatuses"
import routes from "../../routes"

export const EmailConfirmationPage = () => {
    const [confirmationStatus, setConfirmationStatus] = useState("")
    const location = useLocation()
    const navigate = useNavigate()

    const handleReturnHome = () => {
        navigate(routes.HOME)
    }

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        if (!queryParams.get("token")) {
            setConfirmationStatus(authStatuses.ERROR_CONFIRMATION_ERROR)
            return
        }
        confirmCustomerEmail(queryParams.get("token"))
    }, [])

    const confirmCustomerEmail = async(token) => {
        try {
            const response = await confirmCustomerEmailRequest(token)
            setConfirmationStatus(authStatuses.SUCCESS_CONFIRMATION_SUCCESS)
        } catch (err) {
            console.error("Failed to confirm email", err)
            setConfirmationStatus(authStatuses.SUCCESS_CONFIRMATION_SUCCESS)
        }
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <div className="confirmationEmailWrapper">
                        <div className="authorizationTitle">
                            <p onClick={() => {handleReturnHome()}}>TestMy<span>Eng</span></p>
                            <p>&gt;</p>
                            <p>Подтверждение</p>
                        </div>
                        
                        <dvi className="emailStatus">
                            {confirmationStatus.message}
                        </dvi>
                    </div>
                </div>
            </div>
        </div>
    )
}