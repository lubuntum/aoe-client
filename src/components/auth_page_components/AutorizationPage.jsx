import "./css/autorization_page.css"
import "./css/autorization_page_media.css"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"

import { LoginContainer } from "./LoginContainer"
import { RegistrationContainer } from "./RegistrationContainer"
import { PartnerRegistrationContainer } from "./PartnerRegistrationContainer"

import { ForgetPasswordContainer } from "./ForgetPasswordContainer"

const StatusContainer = ({ message, type, exeting, onClose, index }) => {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        setVisible(true)
    }, [])

    useEffect(() => {
        if (exeting) {
            setVisible(false)
            const timer = setTimeout(onClose, 500)
            return () => clearTimeout(timer)
        }
    }, [exeting, onClose])

    const top = 20 + index * 50

    return (
        <div className={`authContentStatus ${type || ""} ${visible ? "show" : "hide"}`} style={{top: `${top}px`}}>
            {message}
        </div>
    )
}

export const AutorizationPage = () => {
    const [currentContent, setCurrentContent] = useState(1)
    const [statusMessages, setStatusMessages] = useState([])
    const navigate = useNavigate()
    const timersRef = useRef({})

    const handleChangeContent = useCallback((newContent) => {
        setCurrentContent(newContent)
    }, [])

    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    const removeStatusMessage = useCallback((id) => {
        setStatusMessages(prev => prev.filter(msg => msg.id !== id))
    }, [])

    const handleStatusChange = useCallback((newStatus) => {
        const id = Date.now()
        const newMessage = { ...newStatus, id, exiting: false }
    
        setStatusMessages(prev => {
            const updated = [...prev, newMessage]
            if (updated.length > 3) {
                const oldest = updated[0]
                const newArray = updated.slice(1).map(msg => 
                    msg.id === oldest.id ? { ...msg, exiting: true } : msg
                )
                setTimeout(() => removeStatusMessage(oldest.id), 500)
                return newArray
            }
            return updated
        })
    
        const timer = setTimeout(() => {
            setStatusMessages(prev => prev.map(msg => 
                msg.id === id ? { ...msg, exiting: true } : msg
            ))
            setTimeout(() => removeStatusMessage(id), 500)
        }, 3000)
    
        timersRef.current[id] = timer
        return () => {
            clearTimeout(timersRef.current[id])
            delete timersRef.current[id]
        }
    }, [removeStatusMessage])

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    {statusMessages.map((status, index) => (
                        <StatusContainer
                            key={status.id}
                            index={index}
                            message={status.message}
                            type={status.type}
                            exiting={status.exiting}
                            onClose={() => removeStatusMessage(status.id)}/>
                    ))}
                    <div className={`authContent ${currentContent === 1 ? 'active' : ''} neumorphism`}>
                        <LoginContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setStatus={handleStatusChange}/>
                    </div>
                    <div className={`authContent ${currentContent === 2 ? 'active' : ''} neumorphism`}>
                        <RegistrationContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setStatus={handleStatusChange}/>
                    </div>
                    <div className={`authContent ${currentContent === 3 ? 'active' : ''} neumorphism`}>
                        <PartnerRegistrationContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setStatus={handleStatusChange}/>
                    </div>
                    <div className={`authContent ${currentContent === 4 ? 'active' : ''} neumorphism`}>
                        <ForgetPasswordContainer 
                            onChangeContent={handleChangeContent} 
                            handleReturnHome={handleReturnHome}
                            setStatus={handleStatusChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}