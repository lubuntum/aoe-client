import "./authorization_style.css"
import "./authorization_media_style.css"

import { useCallback, useEffect, useState } from "react"
import { LogIn } from "./LogIn"
import { SignUp } from "./SignUp"
import { ForgotPassword } from "./ForgotPassword"
import { ToasterComponent } from "../tme_reusable/ToasterComponent"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"
import toast from "react-hot-toast"

/**
 * Компонент страницы авторизации, объединяющий все формы авторизации
 * @module AuthorizationPage
 * @returns {JSX.Element} Компонент страницы авторизации
 */
export const AuthorizationPage = () => {
    const navigate = useNavigate()
    const [currentForm, setCurrentForm] = useState(0)

    /**
     * Удаляем Replain со страницы SessionPage чтобы он не мешал прохождению заданий
     */
    useEffect(() => {
        // Скрываем виджет Replain на странице сессии
        const style = document.createElement('style')
        style.id = 'replain-hide'
        style.innerHTML = `
            .replain-widget,
            [class*="replain"],
            [id*="replain"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `
        document.head.appendChild(style)
        
        return () => {
            // Удаляем стиль при размонтировании
            const styleElement = document.getElementById('replain-hide')
            if (styleElement) {
                styleElement.remove()
            }
        }
    }, [])

    /**
     * Обработчик переключения между формами авторизации
     * @callback handleChangeForm
     * @param {number} newForm - Индекс новой формы (0: вход, 1: регистрация, 2: восстановление пароля)
     */
    const handleChangeForm = useCallback((newForm) => {
        setCurrentForm(newForm)
    }, [])

    /**
     * Обработчик возврата на домашнюю страницу
     * @callback handleReturnHome
     */
    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    /**
     * Обработчик отображения сообщений (успех/ошибка)
     * @callback handleMessages
     * @param {string|Object} messageObj - Сообщение или объект с настройками сообщения
     * @param {string} [messageObj.message] - Текст сообщения
     * @param {string} [messageObj.type] - Тип сообщения ("success" или "error")
     * @param {number} [messageObj.duration] - Длительность отображения в миллисекундах
     */
    const handleMessages = useCallback((messageObj) => {
        if (!messageObj) return

        let message, type = "error", duration = 2000

        if (typeof messageObj === "object" && messageObj.message) {
            message = messageObj.message
            type = messageObj.type || "error"
            duration = messageObj.duration || 2000

        } else {
            message = messageObj
        }

        if (type === "success") {
            toast.success(message, { duration, icon: false })

        } else {
            toast.error(message, { duration, icon: false })
        }
    }, [])

    return (<>
        <div className="content_wrapper">
            <ToasterComponent />

            <div className="authorization_forms_container">
                <div className={`authorization_form ${currentForm === 0 ? "active_form" : ""}`}>
                    <LogIn
                        onChange={handleChangeForm}
                        handleClose={handleReturnHome}
                        setMessage={handleMessages} />
                </div>

                <div className={`authorization_form ${currentForm === 1 ? "active_form" : ""}`}>
                    <SignUp
                        onChange={handleChangeForm}
                        handleClose={handleReturnHome}
                        setMessage={handleMessages} />
                </div>

                <div className={`authorization_form ${currentForm === 2 ? "active_form" : ""}`}>
                    <ForgotPassword
                        onChange={handleChangeForm}
                        handleClose={handleReturnHome}
                        setMessage={handleMessages} />
                </div>
            </div>
        </div>
    </>)
}