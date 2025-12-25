import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { ReactComponent as MicroOn } from "../../res/icons/mic_24dp_gi.svg"
import { Btn } from "../tme_reusable/Btn"

/**
 * @typedef {Object} MicrophoneTestResult
 * @property {boolean} hasPermission - Есть ли разрешение на использование микрофона
 * @property {string} testedAt - Время проверки в ISO формате
 */

/**
 * @typedef {Object} MicroPerfomanceCheckProps
 * @property {function(microphoneData: MicrophoneTestResult): void} onComplete - callback при успешной проверке
 */

/**
 * @typedef {Object} ButtonConfig
 * @property {string} buttonStatus - Текст статуса кнопки
 * @property {string} buttonStyle - CSS класс для стилизации кнопки
 */

/**
 * Компонент проверки микрофона перед началом экзамена
 * @param {MicroPerfomanceCheckProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент проверки микрофона
 */
export const MicroPerfomanceCheck = ({ onComplete }) => {
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isRecording, setIsRecording] = useState(false)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [hasPermission, setHasPermission] = useState(false)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isChecking, setIsChecking] = useState(true)
    
    /** @type {[string, React.Dispatch<React.SetStateAction<string>>]} */
    const [audioUrl, setAudioUrl] = useState("")

    /** @type {React.MutableRefObject<MediaRecorder|null>} */
    const mediaRecorderRef = useRef(null)
    
    /** @type {React.MutableRefObject<Blob[]>} */
    const audioChunksRef = useRef([])
    
    /** @type {React.MutableRefObject<HTMLAudioElement|null>} */
    const audioRef = useRef(null)
    
    /** @type {React.MutableRefObject<MediaStream|null>} */
    const streamRef = useRef(null)

    /**
     * Первоначальная проверка разрешений
     * @returns {void}
     */
    useEffect(() => {
        checkPermission()
    }, [])

    /**
     * Проверяет разрешение на использование микрофона
     * @returns {Promise<void>}
     */
    const checkPermission = useCallback(async () => {
        setIsChecking(true)

        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    autoGainControl: true,
                }
            })
            stream.getTracks().forEach(track => track.stop())
            setHasPermission(true)

        } catch (error) {
            console.log("Microphone permission denied: ", error)
            setHasPermission(false)

        } finally {
            setIsChecking(false)
        }
    }, [])

    /**
     * Запрос разрешения на использоване микрофона
     * @returns {Promise<void>}
     */
    const requestPermission = useCallback(async () => {
        if (isChecking) return
        await checkPermission()
    }, [isChecking, checkPermission])

    /**
     * Начало / остановка записи
     * @returns {Promise<void>}
     */
    const toggleRecording = async () => {
        if (isChecking) return

        if (!isRecording) {

            // Начало записи
            if (!hasPermission) {
                await requestPermission()
                if (!hasPermission) return
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: true,
                    }
                })
                streamRef.current = stream
                audioChunksRef.current = []

                mediaRecorderRef.current = new MediaRecorder(stream)

                mediaRecorderRef.current.ondataavailable = (event) => {
                    if (event.data.size > 0) {
                        audioChunksRef.current.push(event.data)
                    }
                }

                mediaRecorderRef.current.onstop = () => {
                    const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
                    const url = URL.createObjectURL(audioBlob)
                    setAudioUrl(url)
                }

                mediaRecorderRef.current.start()
                setIsRecording(true)
            } catch(error) {
                console.error("Failed start record: ", error)
                setHasPermission(false)
            }
        } else {

            // Остановка записи
            if (mediaRecorderRef.current && isRecording) {
                mediaRecorderRef.current.stop()
                setIsRecording(false)

                if (streamRef.current) {
                    streamRef.current.getTracks().forEach(track => track.stop())
                    streamRef.current = null
                }
            }
        }
    }

    /**
     * Обработка завершения теста микрофона
     * @returns {void}
     */
    const handleProceed = () => {
        /** @type {MicrophoneTestResult} */
        const result = {
            hasPermission: hasPermission,
            testedAt: new Date().toISOString() 
        }
        onComplete(result)
    }

    /**
     * Определяет статус и стиль кнопки микрофона
     * @returns {ButtonConfig} Конфигурация кнопки микрофона
     */
    const { buttonStatus, buttonStyle } = useMemo(() => {
        let status, style
        
        if (isChecking) {
            status = "Проверка..."
            style = "mic_btn mic_btn--checking"

        } else if (isRecording) {
            status = "Идет запись..."
            style = "mic_btn mic_btn--recording"

        } else if (!hasPermission) {
            status = "Разрешите использование микрофона в браузере"
            style = "mic_btn mic_btn--no_permission"

        } else {
            status = "Микрофон обнаружен"
            style = "mic_btn mic_btn--has_permission"
        }
        
        return { buttonStatus: status, buttonStyle: style }
    }, [isChecking, isRecording, hasPermission])

    /**
     * Очистка ресурсов при размонтировании
     * @returns {function(): void} Функция очистки
     */
    useEffect(() => {
        return () => {
            if (audioUrl) {
                URL.revokeObjectURL(audioUrl)
            }

            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop())
            }
        }
    }, [audioUrl])

    return (<>
        <section>
            <div className="micro_check_title">
                <h2>Проверка микрофона</h2>

                <p>Нажми на зеленую кнопку ниже, чтобы предоставить разрешение на использование микрофона.<br/>Также убедись, что разрешил доступ в настройках предпочтительного браузера!</p>
            </div>

            <div className="micro_check_container">
                <div className="micro_button_container">
                    <div className={buttonStyle} onClick={toggleRecording}><MicroOn className="svg_icon"/></div>
                    <span>{buttonStatus}</span>
                </div>
            </div>

            <div className="micro_check_audio">
                {audioUrl && (<audio ref={audioRef} src={audioUrl} controls/>)}

                <Btn btnText={"Приступить к решению"} btnFunc={handleProceed}/>
            </div>
        </section>
    </>)
}