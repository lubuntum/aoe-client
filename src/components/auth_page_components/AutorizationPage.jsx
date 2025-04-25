import "./css/autorization_page.css"
import "./css/autorization_page_media.css"

import { useCallback, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, Toaster } from "react-hot-toast"

import { LoginContainer } from "./LoginContainer"
import { RegistrationContainer } from "./RegistrationContainer"
import { PartnerRegistrationContainer } from "./PartnerRegistrationContainer"
import { ForgetPasswordContainer } from "./ForgetPasswordContainer"

import routes from "../../routes"

export const AutorizationPage = () => {
    const [currentContent, setCurrentContent] = useState(1)
    const [toasterTopPosition, setToasterTopPosition] = useState("40px")
    const navigate = useNavigate()

    const handleChangeContent = useCallback((newContent) => {
        setCurrentContent(newContent)
    }, [])

    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])
    
    const handleResize = () => {
        if (window.innerWidth <= 768) {
            setToasterTopPosition("10px")
        } else {
            setToasterTopPosition("40px")
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

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)
        return () => { window.removeEventListener('resize', handleResize) }
    }, [])
    
    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <Toaster
                        containerStyle={{position: "absolute", top: toasterTopPosition}}
                        toastOptions={{duration: 3000,
                            className: "authToaster",
                            success: {
                                style: {
                                    backgroundColor: "rgba(0, 190, 140, .8)",
                                    color: "white",
                                    backdropFilter: "blur(3px)",
                                    maxWidth: "600px",
                                    width: "100%",
                                    fontSize: "1rem",
                                    textWrap: "nowrap",
                                    textAlign: "center"}},
                            error: {
                                style: {
                                    backgroundColor: "rgba(239, 71, 111, .8)",
                                    color: "white",
                                    backdropFilter: "blur(3px)",
                                    maxWidth: "600px",
                                    width: "100%",
                                    fontSize: "1rem",
                                    textWrap: "nowrap",
                                    textAlign: "center"}}}}/>

                    <div className={`authContent ${currentContent === 1 ? 'active' : ''} neumorphism`}>
                        <LoginContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setNotification={handleToast}/>
                    </div>

                    <div className={`authContent ${currentContent === 2 ? 'active' : ''} neumorphism`}>
                        <RegistrationContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setNotification={handleToast}/>
                    </div>

                    <div className={`authContent ${currentContent === 3 ? 'active' : ''} neumorphism`}>
                        <PartnerRegistrationContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setNotification={handleToast}/>
                    </div>

                    <div className={`authContent ${currentContent === 4 ? 'active' : ''} neumorphism`}>
                        <ForgetPasswordContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setNotification={handleToast}/>
                    </div>
                </div>
            </div>
        </div>
    )
}