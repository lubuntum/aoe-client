import { useCallback, useState } from "react"
import { ReactComponent as CloseI } from "../../res/icons/close_thin_24dp_gi.svg"
import { Field } from "../tme_reusable/Field"
import { Btn } from "../tme_reusable/Btn"
import { BtnLink } from "../tme_reusable/BtnLink"
import { Loader } from "../tme_reusable/Loader"
import { ERROR_MESSAGES, getHttpErrorMessage, SUCCESS_MESSAGES } from "../../modules/auth_modules/authMessages"
import { resetPasswordEmailRequest } from "../../modules/api_modules/emailAPI"

/**
 * Компонент формы восстановления пароля
 * @module ForgotPassword
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onChange - Функция для изменения состояния авторизации (переключение между формами)
 * @param {Function} props.handleClose - Функция для закрытия модального окна/формы
 * @param {Function} props.setMessage - Функция для установки сообщений об ошибках/успехе
 * @returns {JSX.Element} Компонент формы восстановления пароля
 */
export const ForgotPassword = ({ onChange, handleClose, setMessage }) => {
    const [processing, setProcessing] = useState(false)
    const [email, setEmail] = useState("")

    /**
     * Обработчик HTTP ошибок при восстановлении пароля
     * @callback handleHttpError
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
            400: ERROR_MESSAGES.INVALID_CREDENTIALS,
            404: ERROR_MESSAGES.EMAIL_NOT_FOUND,
            422: ERROR_MESSAGES.EMAIL_SEND_FAILED,
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
     * Обработчик отправки запроса на восстановление пароля
     * @async
     * @function handleSubmitData
     * @returns {Promise<void>}
     */
    const handleSubmitData = useCallback(async () => {
        /** @constant {RegExp} Регулярное выражение для валидации email по RFC5322 */
        const rfc5322Regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

        if (!email) {
            setMessage(ERROR_MESSAGES.REQUIRED_FIELD)
            return
        }

        if (!rfc5322Regex.test(email.trim())) {
            setMessage(ERROR_MESSAGES.INVALID_EMAIL)
            return
        }

        try {
            setProcessing(true)
            await resetPasswordEmailRequest(email)
            setMessage(SUCCESS_MESSAGES.PASSWORD_RESET_SENT)
            
        } catch (error) {
            console.error("Failed to send reset password mail:", error)
            setMessage(handleHttpError(error))

        } finally {
            setEmail("")
            setProcessing(false)
        }
    }, [email, setMessage, handleHttpError])

    /**
     * Обработчик изменения email
     * @callback handleEmailChange
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    /**
     * Обработчик нажатия клавиш в форме
     * @callback handleKeyPress
     * @param {React.KeyboardEvent} e - Событие клавиатуры
     */
    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter" && !processing) {
            handleSubmitData()
        }
    }, [processing, handleSubmitData])

    return (<>
        <div className="authorization_container">
            <div className="authorization_header">
                <span>Восстановить пароль</span>

                <CloseI className="svg_icon" onClick={handleClose} />
            </div>

            <div className="authorization_inputs">
                <Field value={email} onChange={handleEmailChange} onKeyPress={handleKeyPress} ph={"Электронная почта"} />
            </div>

            <div className="authorization_buttons">
                {!processing ?
                    <Btn btnText={"Отправить"} btnFunc={handleSubmitData} btnDis={processing} /> :

                    <Loader />}

                <BtnLink btnText={"Я вспомнил пароль"} btnFunc={() => onChange(0)} />
            </div>
        </div>
    </>)
}