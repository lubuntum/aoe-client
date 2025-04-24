import "./css/autorization_page.css"
import "./css/autorization_page_media.css"

import { useEffect, useState } from "react"

import { LoginContainer } from "./LoginContainer"
import { RegistrationContainer } from "./RegistrationContainer"
import { PartnerRegistrationContainer } from "./PartnerRegistrationContainer"

import { ForgetPasswordContainer } from "./ForgetPasswordContainer"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"
import authStatuses from "../../modules/auth_modules/authStatuses"

export const AutorizationPage = () => {
    const [currentContent, setCurrentContent] = useState(1)
    const [authorizationStatus, setAuthorizationStatus] = useState(null)
    const navigate = useNavigate()

    const handleChangeContent = (newContent) => {
        setCurrentContent(newContent)
        setAuthorizationStatus(null)
    }

    const handleReturnHome = () => {
        navigate(routes.HOME)
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <div className={`authContent ${currentContent === 1 ? 'active' : ''} neumorphism`}>
                        <LoginContainer onChangeContent={handleChangeContent} 
                                        handleReturnHome={handleReturnHome}
                                        setAuthorizationStatus={setAuthorizationStatus}/>
                    </div>
                    <div className={`authContent ${currentContent === 2 ? 'active' : ''} neumorphism`}>
                        <RegistrationContainer onChangeContent={handleChangeContent} 
                                               handleReturnHome={handleReturnHome}
                                               setAuthorizationStatus={setAuthorizationStatus}/>
                    </div>
                    <div className={`authContent ${currentContent === 3 ? 'active' : ''} neumorphism`}>
                        <PartnerRegistrationContainer onChangeContent={handleChangeContent} 
                                                      handleReturnHome={handleReturnHome}
                                                      setAuthorizationStatus={setAuthorizationStatus}/>
                    </div>
                    <div className={`authContent ${currentContent === 4 ? 'active' : ''} neumorphism`}>
                        <ForgetPasswordContainer onChangeContent={handleChangeContent} 
                                                 handleReturnHome={handleReturnHome}
                                                 setAuthorizationStatus={setAuthorizationStatus}/>
                    </div>
                </div>
            </div>
        </div>
    )
}