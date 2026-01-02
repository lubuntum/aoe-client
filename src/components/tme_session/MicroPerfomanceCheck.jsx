import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ReactComponent as MicroOn } from "../../res/icons/mic_24dp_gi.svg"
import { Btn } from "../tme_reusable/Btn"

/**
 * Компонент проверки микрофона перед началом экзамена
 * @param {Object} props - Свойства компонента
 * @param {function({hasPermission: boolean, testedAt: string}): void} props.onComplete - callback при успешной проверке
 * @returns {JSX.Element}
 */
export const MicroPerfomanceCheck = ({ onComplete }) => {
    const [isRecording, setIsRecording] = useState(false)
    const [hasPermission, setHasPermission] = useState(false)
    const [isChecking, setIsChecking] = useState(true)
    const [audioUrl, setAudioUrl] = useState("")

    const mediaRecorderRef = useRef(null)
    const audioChunksRef = useRef([])
    const audioRef = useRef(null)
    const streamRef = useRef(null)

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

    const requestPermission = useCallback(async () => {
        if (isChecking) return
        await checkPermission()
    }, [isChecking, checkPermission])

    const toggleRecording = async () => {
        if (isChecking) return

        if (!isRecording) {
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

    const handleProceed = () => {
        onComplete({
            hasPermission: hasPermission,
            testedAt: new Date().toISOString() 
        })
    }

    const { buttonStatus, buttonStyle } = useMemo(() => {
        if (isChecking) {
            return {
                buttonStatus: "Проверка...",
                buttonStyle: "mic_btn mic_btn--checking"
            }
        }

        if (isRecording) {
            return {
                buttonStatus: "Идет запись...",
                buttonStyle: "mic_btn mic_btn--recording"
            }
        }

        if (!hasPermission) {
            return {
                buttonStatus: "Разрешите использование микрофона в браузере",
                buttonStyle: "mic_btn mic_btn--no_permission"
            }
        }

        return {
            buttonStatus: "Микрофон обнаружен",
            buttonStyle: "mic_btn mic_btn--has_permission"
        }
    }, [isChecking, isRecording, hasPermission])

    useEffect(() => {
        checkPermission()
    }, [checkPermission])

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

    return (
        <section>
            <div className="micro_check_title">
                <h2>Проверка микрофона</h2>
                <p>
                    Нажми на зеленую кнопку ниже, чтобы предоставить разрешение на использование микрофона.<br/>
                    Также убедись, что разрешил доступ в настройках предпочтительного браузера!
                </p>
            </div>

            <div className="micro_check_container">
                <div className="micro_button_container">
                    <div className={buttonStyle} onClick={toggleRecording}>
                        <MicroOn className="svg_icon"/>
                    </div>
                    <span>{buttonStatus}</span>
                </div>
            </div>

            <div className="micro_check_audio">
                {audioUrl && <audio ref={audioRef} src={audioUrl} controls/>}
                <Btn btnText="Приступить к решению" btnFunc={handleProceed}/>
            </div>
        </section>
    )
}