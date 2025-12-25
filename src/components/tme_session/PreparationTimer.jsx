import { useCallback, useEffect, useRef, useState } from "react"
import { STAGES } from "./SessionPage"
import { speechUrls } from "../../speechUrls"
import { useAudioSpeaker } from "../../hooks/sound/useAudioSpeaker"
import { useLessonSpeaker } from "../../hooks/sound/useLessonSpeaker"

/**
 * @typedef {Object} PreparationTimerProps
 * @property {number} duration - Длительность таймера в секундах
 * @property {number} stage - Текущая стадия экзамена (из STAGES)
 * @property {function(stage: number): void} setStage - Функция изменения стадии
 * @property {Object} task - Данные текущего задания
 * @property {number} task.taskType - Тип задания (1-4)
 * @property {string} task.id - Идентификатор задания
 * @property {function(): void} onComplete - Callback при завершении таймера
 */

/**
 * @typedef {Object} StageConfig
 * @property {string} audioKey - Ключ для получения URL аудио из speechUrls
 * @property {string} textMessage - Текстовое сообщение для TTS
 * @property {number} nextStage - Следующая стадия
 */

/**
 * Компонент таймера подготовки
 * @param {PreparationTimerProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент таймера подготовки
 */
export const PreparationTimer = ({ duration, stage, setStage, task, onComplete }) => {
    // Рефы
    /** @type {React.MutableRefObject<NodeJS.Timeout|null>} */
    const timerRef = useRef(null)
    
    /** @type {React.MutableRefObject<boolean>} */
    const spokenRef = useRef(false)

    // Состояния
    /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} */
    const [timeLeft, setTimeLeft] = useState(duration)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [timerCompleted, setTimerCompleted] = useState(false)

    // Хуки
    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()

    /**
     * Сообщение для речи в зависимости от стадии и типа задания
     * @returns {StageConfig} Конфигурация для воспроизведения речи
     */
    const handleSpeechMessage = useCallback(() => {
        const stageConfig = {
            [STAGES.PREPARE_READING]: {
                audioKey: task?.taskType?.toString(),
                textMessage: `Now we are ready to start, Task ${task?.taskType || 1}`,
                nextStage: STAGES.READING,
            },
            [STAGES.PREPARE_SPEAKING]: {
                audioKey: "SPEAKING_START",
                textMessage: "Start speaking please",
                nextStage: STAGES.SPEAKING,
            },
        }

        return stageConfig[stage] || stageConfig[STAGES.PREPARE_READING] || stageConfig[STAGES.PREPARE_SPEAKING]
    }, [stage, task?.taskType])

    /**
     * Воспроизведение аудио или синтез речи
     * @returns {Promise<void>}
     */
    const handlePlaySpeech = useCallback(async () => {
        const config = handleSpeechMessage()

        const audioUrl = speechUrls[config?.audioKey]
        if (!audioUrl) {
            console.warn("Preparation: No audio URL found, using TTS")
            await new Promise((res, rej) => {
                speakTTS(config.textMessage, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Preparation: TTS callback executed")
            setStage(config.nextStage)
            onComplete?.()
            return
        }

        try {
            await new Promise((res, rej) => {
                speakAudio(audioUrl, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Preparation: Audio URL callback executed")
            setStage(config.nextStage)
            onComplete?.()
            
        } catch (error) {
            console.error("Preparation: Audio URL error occured, fallback to TTS")
            await new Promise((res, rej) => {
                speakTTS(config.textMessage, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Preparation: TTS fallback executed")
            setStage(config.nextStage)
            onComplete?.()
        }
    }, [handleSpeechMessage, speakAudio, speakTTS, setStage, onComplete])
    
    /**
     * Определяет сообщение для отображения  в зависимости от стадии и номера задания
     * @returns {string} Текстовое сообщение для отображения
     */
    const handleTimerMessage = useCallback(() => {
        const taskNumber = task?.taskType || "NaN"
        
        if (stage === STAGES.PREPARE_READING) {
            return `Get ready for the task ${taskNumber}`

        } else if (stage === STAGES.PREPARE_SPEAKING) {
            return "Get ready for the answer"
        }

        return "Get ready"
    }, [stage, task?.taskType])

    /**
     * Форматирование времени
     * @param {number} seconds - Количество секунд
     * @returns {string} Отформатированное время
     */
    const formatDisplayTime = useCallback((seconds) => {
        return `0${seconds} sec.`
    }, [])

    /**
     * Обработчик завершения таймера
     * @returns {void}
     */
    const handleTimerComplete = useCallback(() => {
        if (!timerCompleted) {
            setTimerCompleted(true)
            handlePlaySpeech()
        }
    }, [timerCompleted, handlePlaySpeech])

    /**
     * Запуск таймера
     * @returns {function(): void} Функция очистки интервала
     */
    useEffect(() => {
        if (timeLeft > 0 && !timerCompleted) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prev => {
                    const newTime = prev - 1
                    if (newTime <= 0) {
                        clearInterval(timerRef.current)
                        return 0
                    }
                    return newTime
                })
            }, 1000)
        }

        return () => {
            if (timerRef.current)
                clearInterval(timerRef.current)
        }
    }, [timeLeft, timerCompleted])

    /**
     * Остановка таймера при достижении 0
     * @returns {void}
     */
    useEffect(() => {
        if (timeLeft === 0 && !timerCompleted)
            handleTimerComplete()
    }, [timeLeft, timerCompleted, handleTimerComplete])

    /**
     * Сброс состояния при изменении стадии
     * @returns {function(): void} Функция очистки интервала
     */
    useEffect(() => {
        setTimeLeft(duration)
        setTimerCompleted(false)
        spokenRef.current = false

        return () => {
            if (timerRef.current)
                clearInterval(timerRef.current)
        }
    }, [stage, duration, task?.id])

    return (<>
        <div className="timer_conatiner">
            <div className="timer_progress_bar">
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progress_bar_back" cx={"50%"} cy={"50%"} r={"45%"}/>
                </svg>
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progress_bar" cx={"50%"} cy={"50%"} r={"45%"} 
                            strokeLinecap="round"
                            strokeDasharray={"300%"}/>
                </svg>
                <div className="timer_progress_bar_shdaow">
                    <div className="progress_bar_shadow_back"></div>
                </div>
                <span className="timer_digit">{formatDisplayTime(timeLeft)}</span>
            </div>
            <span className="timer_message">{handleTimerMessage()}</span>
        </div>
    </>)
}