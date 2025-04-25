import "./css/autorization_page.css"
import { useCallback, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { confirmCustomerEmailRequest } from "../../modules/api_modules/emailAPI"

import { NewButton } from "../reusible_components/NewButton"

import routes from "../../routes"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const EmailConfirmationPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        if (!queryParams.get("token")) {
            return
        }
        confirmCustomerEmail(queryParams.get("token"))
    }, [])

    const confirmCustomerEmail = async(token) => {
        try {
            const response = await confirmCustomerEmailRequest(token)
        } catch (err) {
            console.error("Failed to confirm email", err)
        }
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <div className="confirmationContent neumorphism">
                        <div className="authContentBackHome" onClick={() => handleReturnHome()}>
                            <CloseThinIcon className="svgIcon"/>
                        </div>

                        <div className="authContentTitle">
                            <p>Welcome</p>
                        </div>

                        <div className="authContentDescription">
                            <p>Ваша почта успешно подтверждена! Теперь вы можете начать подготовку к ЕГЭ.</p>
                            <p>Также вам на баланс будут начислены 200 ₽. Вы сможете потратить их на AI-проверку любого варианта.</p>
                        </div>

                        <div className="authContentButtons">
                            <NewButton key={"confirmationButton0"}
                                    buttonText={"На страницу входа"}
                                    buttonWidth={"100%"}
                                    buttonFunc={() => {navigate(routes.AUTORIZATION)}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}