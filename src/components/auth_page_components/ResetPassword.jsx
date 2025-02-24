import { useEffect, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { statuses } from "../../statuses"
import { Loader } from "../reusible_components/Loader"
import { resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"
import { Button } from "../reusible_components/Button"
import routes from "../../routes"
import { InputField } from "../reusible_components/InputField"
import "./css/email_confirmation_page.css"
import "./css/autorization_page.css"
import "./css/autorization_page_media.css"
import { resetPasswordForCustomer } from "../../modules/api_modules/authAPI"
const localStatuses = {
    PASSWORDS_NOT_EQUAL : "NOT_EQUAL"
}
export const ResetPassword = () => {
    const location = useLocation()
    const [status, setStatus] = useState(statuses.IDLE)
    const navigate = useNavigate()
    const [password, setPassword] = useState("")
    const [repeatPassword, setRepeatPassword] = useState("")
    const tokenRef = useRef()
    useEffect(()=>{
        const params = new URLSearchParams(location.search)
        if (!params.get("token")){
            setStatus(statuses.ERROR)
            return
        }
        tokenRef.current = params.get("token")
    }, [])
    const passHandler = (e, value, setValue) => {
        e.target.value === value 
            ? setStatus(statuses.IDLE) 
            : setStatus(localStatuses.PASSWORDS_NOT_EQUAL)
        setValue(e.target.value)
    }
    
    const resetPassword = async () => {
        try{
            const response = await resetPasswordForCustomer(password, tokenRef.current)
            if (response.data) setStatus(statuses.SUCCESS)
        } catch(err) {
            setStatus(statuses.ERROR)
        }
    }

    return(
    <div className="statusWrapper">
        <div className={`authorizationContainer active`}>
            <div className="loginContainerBack">
                <Button key={"resetPasswordTitleButton"}
                        buttonText="Логин"
                        buttonType="link"
                        buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>
            </div>
            <div className="loginContainer">
                {status === statuses.SUCCESS && 
                    <div className="loginContainerPopup popupActive popupGood"> Пароль успешно сброшен</div>}
                {status === localStatuses.PASSWORDS_NOT_EQUAL && 
                    <div className="loginContainerPopup popupActive"> Пароли не совпадают</div>}
                {status === localStatuses.ERROR && 
                    <div className="loginContainerPopup popupActive">Произошла ошибка</div>}
                {status === statuses.IDLE && 
                    <h2>Восстановление пароля</h2>}
                <div className="loginContainerImage">
                    {status === statuses.IDLE &&
                    <div className="loginContainerImageBlur"></div>}
                    <img src="https://img.freepik.com/premium-photo/people-generating-images-using-artificial-intelligence-laptop_23-2150794312.jpg?w=1380"></img>
                </div>
                <div className="loginContainerInputs">
                    <InputField inputType="password"
                                inputValue={password}
                                inputPlaceholder="Новый пароль"
                                inputOnChange={(e) => {passHandler(e, repeatPassword, setPassword)}}/>
                    <InputField inputType="password"
                                inputValue={repeatPassword}
                                inputPlaceholder="Повторите пароль"
                                inputOnChange={(e) => {passHandler(e, password, setRepeatPassword)}}/>
                </div>
                <Button key={"loginButton1"}
                    buttonType={status === statuses.SUCCESS ? "block" : ""}
                    buttonText={status.SUCCESS ? "сброшено" : "сбросить"}
                    buttonWidth={"100%"}
                    buttonFunc={()=>{resetPassword()}}/>
            </div>
        </div>
    </div>)
}