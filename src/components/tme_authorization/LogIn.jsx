import { useCallback, useEffect, useState } from "react"
import { Field } from "../tme_reusable/Field"
import { BtnLink } from "../tme_reusable/BtnLink"
import { Btn } from "../tme_reusable/Btn"
import { Checkbox } from "../tme_reusable/Checkbox"
import { useAuth } from "../../modules/auth_modules/AuthProvider"

import { ERROR_MESSAGES, getHttpErrorMessage } from "../../modules/auth_modules/authMessages"

import { encryptData, decryptData } from "../../modules/crypto_modules/cryptoData"
import { serverLogin } from "../../modules/api_modules/authAPI"

import { ReactComponent as CloseI } from "../../res/icons/close_thin_24dp_gi.svg"
import { Loader } from "../tme_reusable/Loader"

/**
 * Компонент формы входа в систему
 * @module LogIn
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onChange - Функция для изменения состояния авторизации (переключение между формами)
 * @param {Function} props.handleClose - Функция для закрытия модального окна/формы
 * @param {Function} props.setMessage - Функция для установки сообщений об ошибках/успехе
 * @returns {JSX.Element} Компонент формы входа
 */
export const LogIn = ({ onChange, handleClose, setMessage }) => {
    const [processing, setProcessing] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(false)
    const { login, saveEmail } = useAuth()

    /**
     * Сбор данных пользователя после успешной аутентификации
     * @async
     * @function collectData
     * @param {string} token - JWT токен аутентификации
     * @returns {Promise<void>}
     */
    const collectData = useCallback(async (token) => {
        saveEmail(email)
        login(token)
    }, [email, saveEmail, login])

    /**
     * Обработчик HTTP ошибок
     * @callback handleHttpError
     * @param {Object} error - Объект ошибки
     * @param {number} error.status - HTTP статус ошибки
     * @returns {string} Сообщение об ошибке
     */
    const handleHttpError = useCallback((error) => {
        if (!error?.status) {
            return getHttpErrorMessage(error.status)
        }

        /** @type {Object.<number, string>} Маппинг HTTP статусов на сообщения об ошибках */
        const errorMap = {
            400: ERROR_MESSAGES.INVALID_CREDENTIALS,
            401: ERROR_MESSAGES.EMAIL_NOT_FOUND,
            403: ERROR_MESSAGES.ACCOUNT_NOT_ACTIVATED,
            404: ERROR_MESSAGES.USER_NOT_FOUND,
            409: ERROR_MESSAGES.HTTP_409_CONFLICT,
            422: ERROR_MESSAGES.HTTP_422_UNPROCESSABLE_ENTITY,
            423: ERROR_MESSAGES.ACCOUNT_LOCKED,
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
     * Обработчик отправки формы входа
     * @async
     * @function handleSubmitData
     * @returns {Promise<void>}
     */
    const handleSubmitData = useCallback(async () => {
        /** @constant {RegExp} Регулярное выражение для валидации email по RFC5322 */
        const rfc5322Regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

        if (!email || !password) {
            setMessage(ERROR_MESSAGES.REQUIRED_FIELD)
            return
        }

        if (!rfc5322Regex.test(email.trim())) {
            setMessage(ERROR_MESSAGES.INVALID_EMAIL)
            return
        }

        if (password.length < 6) {
            setMessage(ERROR_MESSAGES.PASSWORD_TOO_SHORT)
            return
        }

        try {
            setProcessing(true)
            const response = await serverLogin(email, password)

            if (rememberMe) {
                const cred = { email: email, password: password }
                const encrypted = encryptData(cred)
                localStorage.setItem("savedCred", encrypted)
            } else {
                localStorage.removeItem("savedCred")
            }

            await collectData(response.data.token)

        } catch (error) {
            console.error("Failed to login:", error)
            setMessage(handleHttpError(error))

        } finally {
            setProcessing(false)
        }
    }, [email, password, rememberMe, setMessage, collectData, handleHttpError])

    /**
     * Обработчик изменения email
     * @callback handleEmailChange
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value)
    }, [])

    /**
     * Обработчик изменения пароля
     * @callback handlePasswordChange
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handlePasswordChange = useCallback((e) => {
        setPassword(e.target.value)
    }, [])

    /**
     * Обработчик изменения флага "Запомнить меня"
     * @callback handleRememberChange
     */
    const handleRememberChange = useCallback(() => {
        const tempValue = !rememberMe
        setRememberMe(tempValue)
        if (!tempValue) localStorage.removeItem("savedCred")
    }, [rememberMe])

    /**
     * Эффект для загрузки сохраненных учетных данных при монтировании компонента
     * @effect
     */
    useEffect(() => {
        const savedCred = localStorage.getItem("savedCred")
        if (savedCred) {
            try {
                const decrypted = decryptData(savedCred)
                if (decrypted) {
                    setEmail(decrypted.email)
                    setPassword(decrypted.password)
                    setRememberMe(true)
                }
            } catch (err) {
                console.error("Failed to decrypt cred", err)
                localStorage.removeItem("savedCred")
            }
        }
    }, [])

    /**
     * Обработчик нажатия клавиш
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
                <span>Добро пожаловать!</span>

                <CloseI className="svg_icon" onClick={handleClose} />
            </div>

            <div className="authorization_inputs">
                <Field
                    value={email}
                    onChange={handleEmailChange}
                    onKeyPress={handleKeyPress}
                    ph={"Электронная почта"} />

                <Field
                    value={password}
                    type={"password"}
                    onChange={handlePasswordChange}
                    onKeyPress={handleKeyPress}
                    ph={"Пароль"} />

                <div className="authorization_options">
                    <Checkbox
                        checkboxText={"Запомнить меня"}
                        checkboxId={"remember_me"}
                        checked={rememberMe}
                        onChange={handleRememberChange} />

                    <BtnLink btnText={"Забыли пароль?"} btnFunc={() => onChange(2)} />
                </div>
            </div>

            <div className="authorization_buttons">
                {!processing ?
                    <Btn btnText={"Войти"} btnFunc={handleSubmitData} btnDis={processing} /> :

                    <Loader />}

                <BtnLink btnText={"Создать новый аккаунт"} btnFunc={() => onChange(1)} />
            </div>
        </div>
    </>)
}