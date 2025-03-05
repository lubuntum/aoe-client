import { useState } from "react"
import { Button } from "../reusible_components/Button"
import { InputField } from "../reusible_components/InputField"
import "./css/email_confirmation_page.css"
import "./css/autorization_page.css"
import "./css/autorization_page_media.css"
import { resetPasswordCustomerEmailRequest, resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"
/**
 * TODO добавить компонент для перехода по ссылке и сброс самого пароля.
 */
const statuses = {
    IDLE: "IDLE",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
    EMPTY: "EMPTY",
    FORMAT_ERROR: "FORMAT_ERROR"
}
export const ForgetPasswordContainer = ({setForgetPassword}) => {
    const navigate = useNavigate()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [status, setStatus] = useState(statuses.IDLE)
    const resetPasswordEmail = async () => {
        const emailRegex = /\S+@\S+\.\S+/;
        if (!email || !password){
            setStatus(statuses.EMPTY)
            return
        }
        if (!emailRegex.test(email)){
            setStatus(statuses.FORMAT_ERROR)
            return
        }
        try{
            const response = await resetPasswordEmailRequest(email, password)
            setStatus(statuses.SUCCESS)
        } catch(err) {
            setStatus(statuses.ERROR)
        }
    }
    return(
        <div className={`autorizationContainer active`}>
            <div className={`loginContainer`}>
                <div className={`loginContainerPopup ${(status === statuses.SUCCESS) && "popupActive popupGood"}`}>Пожалуйста проверьте свою почту</div>
                <div className={`loginContainerPopup ${(status === statuses.EMPTY) && "popupActive"}`}>Заполните все поля</div>
                <div className={`loginContainerPopup ${(status === statuses.FORMAT_ERROR) && "popupActive"}`}>Напишите почту в верном формате</div>
                <div className={`loginContainerPopup ${(status === statuses.ERROR) && "popupActive"}`}>Возникла ошибка, попробуйте снова</div>
                {status === statuses.IDLE &&
                    <h2>Сброс пароля</h2>}
                <div className="loginContainerImage">
                    {status === statuses.IDLE &&
                    <div className="loginContainerImageBlur"></div>}
                    <img src="https://img.freepik.com/premium-photo/people-generating-images-using-artificial-intelligence-laptop_23-2150794312.jpg?w=1380"></img>
                </div>
                <div className="loginContainerInputs">
                    <InputField key={"loginInput0"}
                                inputType={"text"}
                                inputValue={email}
                                inputPlaceholder={"Электронная почта"}
                                inputOnChange={(e)=>{setEmail(e.target.value)}}/>
                </div>
                <div className="createDeclineContainer">
                    <Button key={"resetButton0"}
                            buttonType={status === statuses.SUCCESS ? "block" : ""}
                            buttonText={"Отправить"}
                            buttonWidth={"100%"}
                            buttonFunc={()=>{resetPasswordEmail()}}/>
                    <Button key={"cancelButton3"}
                            buttonText={"Назад"}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonFunc={()=>{setForgetPassword(false)}}/>
                </div>  
            </div>
        </div>
    )
}