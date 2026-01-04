import { useCallback, useEffect } from "react"
import { ReactComponent as CloseI } from "../../res/icons/close_thin_24dp_gi.svg"
import { Btn } from "../tme_reusable/Btn"
import { useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"
import { confirmCustomerEmailRequest } from "../../modules/api_modules/emailAPI"

/**
 * Компонент страницы подтверждения email
 * Обрабатывает подтверждение email через токен из URL и отображает результат пользователю
 * @component
 * @returns {JSX.Element} JSX элемент компонента подтверждения email
 */
export const EmailConfirm = () => {
    const location = useLocation()
    const navigate = useNavigate()

    /**
     * Обработчик подтверждения email пользователя
     * @async
     * @callback handleConfirmEmail
     * @param {string} token - Токен подтверждения email из URL
     * @returns {Promise<void>}
     */
    const handleConfirmEmail = useCallback(async (token) => {
        try {
            await confirmCustomerEmailRequest(token)
        } catch (error) {
            console.error("Failed to confirm email:", error)
        }
    }, [])

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
     * Обработчик возврата на домашнюю страницу
     * @callback handleReturnHome
     */
    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    /**
     * Обработчик возврата на страницу авторизации
     * @callback handleReturnLogin
     */
    const handleReturnLogin = useCallback(() => {
        navigate(routes.AUTORIZATION)
    }, [navigate])

    /**
     * Эффект для извлечения токена подтверждения email из query параметров URL
     * Проверяет наличие токена и вызывает функцию подтверждения email
     * @effect
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search)
        if (!params.get("token")) {
            return
        }
        handleConfirmEmail(params.get("token"))
    }, [location.search, handleConfirmEmail])

    return (<>
        <div className="content_wrapper">
            <div className="authorization_forms_container">
                <div className="authorization_container">
                    <div className="authorization_header">
                        <span>Аккаунт активирован!</span>

                        <CloseI className="svg_icon" onClick={handleReturnHome} />
                    </div>

                    <div className="authorization_description">
                        <p>Ваша почта успешно подтверждена! Теперь вы можете начать подготовку к ЕГЭ.</p>
                    </div>

                    <div className="authorization_buttons">
                        <Btn btnText={"На страницу входа"} btnFunc={handleReturnLogin} />
                    </div>
                </div>
            </div>
        </div>
    </>)
}