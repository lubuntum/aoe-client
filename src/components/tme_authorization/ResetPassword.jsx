import { useCallback, useEffect, useRef, useState } from "react"
import { ReactComponent as CloseI } from "../../res/icons/close_thin_24dp_gi.svg"
import { Field } from "../tme_reusable/Field"
import { Btn } from "../tme_reusable/Btn"
import { Loader } from "../tme_reusable/Loader"
import { useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"
import { ToasterComponent } from "../tme_reusable/ToasterComponent"
import toast from "react-hot-toast"
import { ERROR_MESSAGES, getHttpErrorMessage, SUCCESS_MESSAGES } from "../../modules/auth_modules/authMessages"
import { resetPasswordForCustomer } from "../../modules/api_modules/authAPI"

/**
 * Компонент для сброса пароля пользователя
 * @component
 * @returns {JSX.Element} JSX элемент компонента сброса пароля
 */
export const ResetPassword = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const [processing, setProcessing] = useState(false)
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")

    const tokenRef = useRef()

    /**
     * Обработчик отображения сообщений (успех/ошибка)
     * @callback
     * @param {string|Object} messageObj - Сообщение или объект с настройками сообщения
     * @param {string} [messageObj.message] - Текст сообщения
     * @param {string} [messageObj.type] - Тип сообщения ("success" или "error")
     * @param {number} [messageObj.duration] - Длительность отображения в миллисекундах
     */
    const handleMessages = useCallback((messageObj) => {
        if (!messageObj) return

        let message
        let type = "error"
        let duration = 2000

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
     * Эффект для извлечения токена сброса пароля из query параметров URL
     * Проверяет наличие токена и отображает сообщение об ошибке, если токен отсутствует
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search)

        if (!params.get("token")) {
            handleMessages(ERROR_MESSAGES.RESET_TOKEN_EXPIRED)
            return
        }

        tokenRef.current = params.get("token")
    }, [location.search, handleMessages]) // Добавлены зависимости

    /**
     * Обработчик изменения поля нового пароля
     * @callback
     * @param {import('react').ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    /**
     * Обработчик изменения поля повторного ввода пароля
     * @callback
     * @param {import('react').ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handleRepeatChange = useCallback((e) => {
        setRepeat(e.target.value)
    }, [])

    /**
     * Обработчик возврата на домашнюю страницу
     * @callback
     */
    const handleReturnHome = useCallback(() => {
        navigate(routes.HOME)
    }, [navigate])

    /**
     * Обработчик HTTP ошибок при восстановлении пароля
     * @callback
     * @param {Object} error - Объект ошибки
     * @param {number} error.status - HTTP статус ошибки
     * @returns {string} Сообщение об ошибке
     */
    const handleHttpError = useCallback((error) => {
        if (!error?.status) {
            return getHttpErrorMessage(error.status)
        }

        /** @type {Object.<number, string>} Маппинг HTTP статусов на сообщения об ошибках для восстановления пароля */
        const errorMap = {
            400: ERROR_MESSAGES.HTTP_400_BAD_REQUEST,
            401: ERROR_MESSAGES.INVALID_TOKEN,
            403: ERROR_MESSAGES.UNAUTHORIZED,
            404: ERROR_MESSAGES.INVALID_RESET_TOKEN,
            409: ERROR_MESSAGES.NEW_PASSWORD_SAME_AS_OLD,
            422: ERROR_MESSAGES.WEAK_PASSWORD,
            429: ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
            500: ERROR_MESSAGES.HTTP_500_INTERNAL_SERVER_ERROR,
            502: ERROR_MESSAGES.HTTP_502_BAD_GATEWAY,
            503: ERROR_MESSAGES.HTTP_503_SERVICE_UNAVAILABLE,
            504: ERROR_MESSAGES.HTTP_504_GATEWAY_TIMEOUT,
        }

        if (errorMap[error?.status]) {
            return errorMap[error.status]
        }

        if (!navigator.onLine) {
            return ERROR_MESSAGES.NETWORK_ERROR
        }

        return ERROR_MESSAGES.UNKNOWN_ERROR
    }, [])

    /**
     * Обработчик отправки формы сброса пароля
     * Выполняет валидацию полей и отправляет запрос на сброс пароля
     * @async
     * @returns {Promise<void>}
     */
    const handleSubmitData = useCallback(async () => {
        /** @constant {RegExp} Регулярное выражение для валидации пароля */
        const passRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,}$/i

        if (!password || !repeat) {
            handleMessages(ERROR_MESSAGES.REQUIRED_FIELD)
            return
        }

        if (password.length < 6) {
            handleMessages(ERROR_MESSAGES.PASSWORD_TOO_SHORT)
            return
        }

        if (!passRegex.test(password)) {
            handleMessages(ERROR_MESSAGES.WEAK_PASSWORD)
            return
        }

        if (password !== repeat) {
            handleMessages(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH)
            return
        }

        try {
            setProcessing(true)
            await resetPasswordForCustomer(password, tokenRef.current)
            handleMessages(SUCCESS_MESSAGES.PASSWORD_RESET_SUCCESS)

        } catch (error) {
            console.error("Failed to reset password:", error)
            handleMessages(handleHttpError(error))

        } finally {
            setPassword("")
            setRepeat("")
            setProcessing(false)
        }
    }, [password, repeat, handleMessages, handleHttpError])

    return (<>
        <div className="content_wrapper">
            <ToasterComponent />

            <div className="authorization_forms_container">
                <div className="authorization_container">
                    <div className="authorization_header">
                        <span>Новый пароль</span>

                        <CloseI className="svg_icon" onClick={handleReturnHome} />
                    </div>

                    <div className="authorization_inputs">
                        <Field value={password} type={"password"} onChange={handlePasswordChange} ph={"Новый пароль"} />

                        <Field value={repeat} type={"password"} onChange={handleRepeatChange} ph={"Повторите пароль"} />
                    </div>

                    <div className="authorization_buttons">
                        {!processing ?
                            <Btn btnText={"Подтвердить"} btnFunc={handleSubmitData} btnDis={processing} /> :

                            <Loader />}
                    </div>
                </div>
            </div>
        </div>
    </>)
}