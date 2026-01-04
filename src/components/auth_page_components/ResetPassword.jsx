import { useCallback, useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"

import { resetPasswordForCustomer } from "../../modules/api_modules/authAPI"
import { validResetPasswords } from "../utils/validResetPasswords"

import { NewInput } from "../reusible_components/NewInput"
import { NewButton } from "../reusible_components/NewButton"

import routes from "../../routes"
import authStatuses from "../../modules/auth_modules/OLD_authStatuses"

import { ReactComponent as CloseThinIcon } from "../../res/icons/close_thin_24dp_gi.svg"

export const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const tokenRef = useRef()

    const [resetProcessing, setResetProcessing] = useState(false)

    const [resetPassword, setResetPassword] = useState()
    const [resetRepeatPassword, setResetRepeatPassword] = useState()

    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (!params.get("token")) {
            handleToast(authStatuses.ERROR_RESET_ERROR)
            return
        }
        tokenRef.current = params.get("token")
    }, [location.search])

    const handleSubmit = async() => {
        const passwordsData = {
            resetPassword,
            resetRepeatPassword
        }

        const validResult = validResetPasswords(passwordsData)
        setResetProcessing(true)

        if (validResult) {
            setResetProcessing(false)
            handleToast(validResult)
            return
        }

        try {
            const response = await resetPasswordForCustomer(resetPassword, tokenRef.current)
            if (response.data) {
                handleToast(authStatuses.SUCCESS_RESET_SUCCESS)
            }
        } catch (err) {
            handleToast(authStatuses.ERROR_RESET_ERROR)
        } finally {
            setResetPassword("")
            setResetRepeatPassword("")
            setResetProcessing(false)
        }
    }

    const handleToast = (notification) => {
        if (notification.type === "success") {
            toast.success(notification.message, {icon: false})
        }
        else if (notification.type === "error") {
            toast.error(notification.message, {icon: false})
        }
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <Toaster
                        containerStyle={{position: "absolute", top: "40px"}}
                        toastOptions={{duration: 3000,
                            success: {
                                style: {
                                    backgroundColor: "rgba(0, 190, 140, .8)",
                                    color: "white",
                                    backdropFilter: "blur(3px)",
                                    maxWidth: "600px",
                                    width: "100%",
                                    fontSize: "1.125rem",
                                    textWrap: "nowrap",
                                    textAlign: "center"}},
                            error: {
                                style: {
                                    backgroundColor: "rgba(239, 71, 111, .8)",
                                    color: "white",
                                    backdropFilter: "blur(3px)",
                                    maxWidth: "600px",
                                    width: "100%",
                                    fontSize: "1.125rem",
                                    textWrap: "nowrap",
                                    textAlign: "center"}}}}/>

                    <div className="resetContent neumorphism">
                        <div className="authContentBackHome" onClick={() => handleReturnHome()}>
                            <CloseThinIcon className="svgIcon"/>
                        </div>
                
                        <div className="authContentTitle">
                            <p>Reset password</p>
                        </div>

                        <div className="authContentInputs">
                            <NewInput key={"reset1Input0"}
                                inputValue={resetPassword}
                                inputType={"password"}
                                inputPlaceholder={"новый пароль"}
                                inputOnChange={(e) => {setResetPassword(e.target.value)}}/>

                            <NewInput key={"reset1Input1"}
                                inputValue={resetRepeatPassword}
                                inputType={"password"}
                                inputPlaceholder={"повторите пароль"}
                                inputOnChange={(e) => {setResetRepeatPassword(e.target.value)}}/>
                        </div>

                        <div className="authContentButtons">
                            {!resetProcessing ? 
                                <NewButton key={"reset1Button0"}
                                        buttonText={"Подтвердить"}
                                        buttonWidth={"100%"}
                                        buttonFunc={handleSubmit}/> :
                                <div className="loaderProcessingContainer">
                                    <p>Загрузка</p>
                            </div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}