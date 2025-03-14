import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { statuses } from "../../statuses"
import { Loader } from "../reusible_components/Loader"
import { resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"
import { Button } from "../reusible_components/Button"
import routes from "../../routes"
import { InputField } from "../reusible_components/InputField"
import { resetPasswordForCustomer } from "../../modules/api_modules/authAPI"
import authStatuses from "../../modules/auth_modules/authStatuses"

export const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const tokenRef = useRef()

    const [resetPassword, setResetPassword] = useState()
    const [resetRepeatPassword, setResetRepeatPassword] = useState()

    const [resetStatus, setResetStatus] = useState("")
    const [resetProcessing, setResetProcessing] = useState(false)

    const handleReturnHome = () => {
        navigate(routes.HOME)
    }

    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (!params.get("token")) {
            setResetStatus(authStatuses.ERROR_RESET_ERROR)
            return
        }
        tokenRef.current = params.get("token")
    }, [])

    const handleSubmit = async() => {
        setResetProcessing(true)
        const validResult = validPassword()
        if (validResult) {
            setResetStatus(validResult)
            setResetProcessing(false)
            return
        }
        try {
            const response = await resetPasswordForCustomer(resetPassword, tokenRef.current)
            if (response.data) {
                setResetStatus(authStatuses.SUCCESS_RESET_SUCCESS)
            }
        } catch (err) {
            setResetStatus(authStatuses.ERROR_RESET_ERROR)
        } finally {
            setResetProcessing(false)
        }
    }

    const validPassword = () => {
        if (!resetPassword || !resetRepeatPassword)
            return authStatuses.ERROR_REG_FIELDS_ARE_EMPTY

        if (resetPassword.length < 5)
            return authStatuses.ERROR_PASS_NOT_VALID

        if (resetPassword !== resetRepeatPassword)
            return authStatuses.ERROR_PASS_NOT_EQUAL

        return null
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <div className={`authorizationStatusContainer ${resetStatus ? "visible" : ""}`}>
                        {resetStatus && (
                            <div className={`statusMessage ${resetStatus.type}`}>
                                {resetStatus.message}
                            </div>
                        )}
                    </div>

                    <div className="resetPasswordWrapper">
                        <div className="authorizationTitle">
                            <p onClick={() => {handleReturnHome()}}>TestMy<span>Eng</span></p>
                            <p>&gt;</p>
                            <p>Новый пароль</p>
                        </div>

                        <div className="resetPasswordInputs">
                            <InputField key={"resetPasswordInput0"}
                                        inputType={"password"}
                                        inputValue={resetPassword}
                                        inputPlaceholder={"Пароль"}
                                        inputOnChange={(e)=>{setResetPassword(e.target.value)}}/>

                            <InputField key={"resetPasswordInput1"}
                                        inputType={"password"}
                                        inputValue={resetRepeatPassword}
                                        inputPlaceholder={"Повторите пароль"}
                                        inputOnChange={(e)=>{setResetRepeatPassword(e.target.value)}}/>
                        </div>

                        <div className="resetOrContainer">
                            {!resetProcessing ?
                            <Button key={"resetPasswordButton0"}
                                    buttonText={"Подтвердить"}
                                    buttonWidth={"100%"}
                                    buttonFunc={handleSubmit}/> : 
                            <Loader/>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}