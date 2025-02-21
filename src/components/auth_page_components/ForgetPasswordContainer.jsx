import { useState } from "react"
import { Button } from "../reusible_components/Button"
import { InputField } from "../reusible_components/InputField"
import "./css/email_confirmation_page.css"
import { resetPasswordCustomerEmailRequest, resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"
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
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [status, setStatus] = useState(statuses.IDLE)
    const resetPassword = async () => {
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
        <>
            <div className={`autorizationContainer active`}>
                <div className="loginContainerBack">
                    <Button key={"loginTitleButton0"}
                            buttonText={"Логин"}
                            buttonType={"link"}
                            buttonFunc={()=>setForgetPassword(false)}/>
                </div>
                <div className={`loginContainer`}>
                        <div className={`loginContainerPopup } ${(status === statuses.SUCCESS) ? "popupGood" : ""}`}>Пожалуйста проверьте свою почту</div>
                        {status === statuses.IDLE &&
                        <h2>TestMy<span>Eng</span></h2>}
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
        
                            <InputField key={"loginInput1"}
                                        inputType={"password"}
                                        inputValue={password}
                                        inputPlaceholder={"Примерный пароль"}
                                        hideIndicator={true}
                                        inputOnChange={(e)=>{setPassword(e.target.value)}}/>
                        </div>
                        <Button key={"loginButton1"}
                            buttonType={status === statuses.SUCCESS ? "block" : ""}
                            buttonText={"Сбросить"}
                            buttonWidth={"100%"}
                            buttonFunc={()=>{resetPassword()}}/>
                        <div style={{textAlign:"center"}}>
                            {status === statuses.SUCCESS && <p className="successStatus">Проверьте почту</p>}
                            {status === statuses.EMPTY && <p className="errorStatus">Заполните все поля</p>}
                            {status === statuses.FORMAT_ERROR && <p className="errorStatus">Напишите почту в нужном формате</p>}
                            {status === statuses.ERROR && <p className="errorStatus">Возникла ошибка, попробуйте снова</p>}
                        </div>
                        
                    </div>
            </div>
        </>
    )
}