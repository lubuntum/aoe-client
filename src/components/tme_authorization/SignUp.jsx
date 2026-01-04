import { useCallback, useState } from "react"

import { ReactComponent as CloseI } from "../../res/icons/close_thin_24dp_gi.svg"
import { Field } from "../tme_reusable/Field"
import { Checkbox } from "../tme_reusable/Checkbox"
import routes from "../../routes"
import { Btn } from "../tme_reusable/Btn"
import { Loader } from "../tme_reusable/Loader"
import { BtnLink } from "../tme_reusable/BtnLink"
import { registration } from "../../modules/api_modules/authAPI"
import { getCurrentDate } from "../../modules/date_modules/currentDate"
import { ERROR_MESSAGES, getHttpErrorMessage, SUCCESS_MESSAGES } from "../../modules/auth_modules/authMessages"

/**
 * Компонент формы регистрации нового пользователя
 * @module SignUp
 * @param {Object} props - Свойства компонента
 * @param {Function} props.onChange - Функция для изменения состояния авторизации (переключение между формами)
 * @param {Function} props.handleClose - Функция для закрытия модального окна/формы
 * @param {Function} props.setMessage - Функция для установки сообщений об ошибках/успехе
 * @returns {JSX.Element} Компонент формы регистрации
 */
export const SignUp = ({ onChange, handleClose, setMessage }) => {
    const [processing, setProcessing] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repeat, setRepeat] = useState("")
    const [privacyPolice, setPrivacyPolice] = useState(false)
    const [userAgreement, setUserAgreement] = useState(false)

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
     * Обработчик изменения подтверждения пароля
     * @callback handleRepeatChange
     * @param {React.ChangeEvent<HTMLInputElement>} e - Событие изменения input
     */
    const handleRepeatChange = useCallback((e) => {
        setRepeat(e.target.value)
    }, [])

    /**
     * Обработчик изменения состояния принятия политики конфиденциальности
     * @callback privacyPoliceChange
     */
    const privacyPoliceChange = useCallback(() => {
        setPrivacyPolice(!privacyPolice)
    }, [privacyPolice])

    /**
     * Обработчик изменения состояния принятия пользовательского соглашения
     * @callback userAgreementChange
     */
    const userAgreementChange = useCallback(() => {
        setUserAgreement(!userAgreement)
    }, [userAgreement])

    /**
     * Обработчик HTTP ошибок при регистрации
     * @callback handleHttpError
     * @param {Object} error - Объект ошибки
     * @param {number} error.status - HTTP статус ошибки
     * @returns {string} Сообщение об ошибке
     */
    const handleHttpError = useCallback((error) => {
        if (!error?.status) {
            return getHttpErrorMessage(error.status)
        }

        /** @type {Object.<number, string>} Маппинг HTTP статусов на сообщения об ошибках для регистрации */
        const errorMap = {
            400: ERROR_MESSAGES.INVALID_CREDENTIALS,
            401: ERROR_MESSAGES.INVALID_CREDENTIALS,
            403: ERROR_MESSAGES.ACCOUNT_NOT_ACTIVATED,
            404: ERROR_MESSAGES.USER_NOT_FOUND,
            409: ERROR_MESSAGES.EMAIL_ALREADY_EXISTS,
            423: ERROR_MESSAGES.ACCOUNT_LOCKED,
            429: ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
            422: ERROR_MESSAGES.HTTP_422_UNPROCESSABLE_ENTITY,
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

        return ERROR_MESSAGES.EMAIL_ALREADY_EXISTS
    }, [])

    /**
     * Сбор данных пользователя для регистрации
     * @callback assembleData
     * @returns {Object} Объект с данными пользователя для регистрации
     * @property {string} email - Email пользователя
     * @property {string} name - Имя пользователя (по умолчанию "default")
     * @property {string} secondName - Фамилия пользователя (по умолчанию "default")
     * @property {string} password - Пароль пользователя
     * @property {string} registrationDate - Дата регистрации
     * @property {boolean} isPartnerProposal - Флаг предложения партнерства
     */
    const assembleData = useCallback(() => {
        return {
            "email": email,
            "name": "default",
            "secondName": "default",
            "password": password,
            registrationDate: getCurrentDate(),
            isPartnerProposal: false,
        }
    }, [email, password])

    /**
     * Обработчик отправки формы регистрации
     * @async
     * @function handleSubmitData
     * @returns {Promise<void>}
     */
    const handleSubmitData = useCallback(async () => {
        /** @constant {RegExp} Регулярное выражение для валидации email по RFC5322 */
        const rfc5322Regex = /^(([^<>()[\]\\.,:\s@"]+(\.[^<>()[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i

        /** @constant {RegExp} Регулярное выражение для валидации пароля */
        const passRegex = /^(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[a-z\d@$!%*?&]{6,}$/i

        if (!email || !password || !repeat) {
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

        if (!passRegex.test(password)) {
            setMessage(ERROR_MESSAGES.WEAK_PASSWORD)
            return
        }

        if (password !== repeat) {
            setMessage(ERROR_MESSAGES.PASSWORDS_DO_NOT_MATCH)
            return
        }

        if (!privacyPolice || !userAgreement) {
            setMessage(ERROR_MESSAGES.TERMS_NOT_ACCEPTED)
            return
        }

        try {
            setProcessing(true)
            const user = assembleData()
            await registration(user)
            setMessage(SUCCESS_MESSAGES.REGISTRATION_EMAIL_SENT)
            onChange(0)

        } catch (error) {
            console.error("Failed to create a account:", error)
            setMessage(handleHttpError(error))

        } finally {
            setEmail("")
            setPassword("")
            setRepeat("")
            setPrivacyPolice(false)
            setUserAgreement(false)
            setProcessing(false)
        }
    }, [email, password, repeat, privacyPolice, userAgreement, setMessage, assembleData, onChange, handleHttpError])

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
                <span>Привет,<br />давай знакомиться!</span>

                <CloseI className="svg_icon" onClick={handleClose} />
            </div>

            <div className="authorization_inputs">
                <Field value={email} onChange={handleEmailChange} onKeyPress={handleKeyPress} ph={"Электронная почта"} />

                <Field value={password} type={"password"} onChange={handlePasswordChange} onKeyPress={handleKeyPress} ph={"Пароль"} />

                <Field value={repeat} type={"password"} onChange={handleRepeatChange} onKeyPress={handleKeyPress} ph={"Повторите пароль"} />

                <div className="authorization_signup_options">
                    <Checkbox
                        checkboxText={"Принять"}
                        checkboxLink={"политику конфиденциальности"}
                        linkClick={() => window.open(routes.PRIVACY_POLICE, "_blank")}
                        checkboxId={"privacy_police"}
                        checked={privacyPolice}
                        onChange={privacyPoliceChange} />

                    <Checkbox
                        checkboxText={"Принять"}
                        checkboxLink={"пользовательское соглашение"}
                        linkClick={() => window.open(routes.USER_AGREEMENT, "_blank")}
                        checkboxId={"user_agreement"}
                        checked={userAgreement}
                        onChange={userAgreementChange} />
                </div>
            </div>

            <div className="authorization_buttons">
                {!processing ?
                    <Btn btnText={"Зарегистрироваться"} btnFunc={handleSubmitData} btnDis={processing} /> :

                    <Loader />}

                <BtnLink btnText={"У меня уже есть аккаунт"} btnFunc={() => onChange(0)} />
            </div>
        </div>
    </>)
}