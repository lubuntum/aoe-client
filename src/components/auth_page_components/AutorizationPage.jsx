import "./css/autorization_page.css"
import "./css/autorization_page_media.css"

import { useState } from "react"
import { useLocation } from "react-router-dom"
import routes from "../../routes"
import { LoginContainer } from "./LoginContainer"
import { RegistrationContainer } from "./RegistrationContainer"
import { ForgetPasswordContainer } from "./ForgetPasswordContainer"

export const AutorizationPage = () => {
    const location = useLocation()
    const [loginToggle, setLoginToggle] = useState(true)
    const [registrationConfirm, setRegistrationConfirm] = useState(false)
    const [forgetPassword, setForgetPassword] = useState(false)
    const handleToggle = () => {
        setLoginToggle(!loginToggle)
    }
    console.log(forgetPassword)
    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    {forgetPassword ? <ForgetPasswordContainer setForgetPassword={setForgetPassword}/> :
                        location.pathname !== routes.PARTNERSHIP_AUTHORIZATION ?
                        <>
                            <LoginContainer handleToggle={handleToggle} loginToggle={loginToggle} setLoginToggle={setLoginToggle} registrationConfirm={registrationConfirm} setForgetPassword={setForgetPassword}/>
                            <RegistrationContainer handleToggle={handleToggle} loginToggle={loginToggle} setLoginToggle={setLoginToggle} setRegistrationConfirm={setRegistrationConfirm}/>
                        </> :
    
                        <RegistrationContainer setRegistrationConfirm={setRegistrationConfirm}/>
                    }
                </div>
            </div>
        </div>
    </>)
}