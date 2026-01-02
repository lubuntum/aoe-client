import { useCallback, useEffect, useRef, useState } from "react"
import { STAGES } from "./SessionPage"
import { speechUrls } from "../../speechUrls"
import { useAudioSpeaker } from "../../hooks/sound/useAudioSpeaker"
import { useLessonSpeaker } from "../../hooks/sound/useLessonSpeaker"

/**
 * Компонент таймера подготовки перед выполнением задания
 * @param {Object} props - Свойства компонента
 * @param {number} props.duration - Длительность таймера в секундах
 * @param {number} props.stage - Текущая стадия экзамена (из STAGES)
 * @param {function(number): void} props.setStage - Функция изменения стадии
 * @param {Object} props.task - Данные текущего задания
 * @param {number} props.task.taskType - Тип задания (1-4)
 * @param {string} props.task.id - Идентификатор задания
 * @param {function(): void} props.onComplete - Callback при завершении таймера
 * @returns {JSX.Element}
 */
export const PreparationTimer = ({ duration, stage, setStage, task, onComplete }) => {
    const timerRef = useRef(null)
    const spokenRef = useRef(false)

    const [timeLeft, setTimeLeft] = useState(duration)
    const [timerCompleted, setTimerCompleted] = useState(false)

    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()

    /**
     * Определяет конфигурацию для воспроизведения речи в зависимости от стадии
     * @returns {Object} Конфигурация с ключом аудио, текстом и следующей стадией
     */
    const handleSpeechMessage = useCallback(() => {
        if (stage === STAGES.PREPARE_SPEAKING) {
            return {
                audioKey: "SPEAKING_START",
                textMessage: "Start speaking please",
                nextStage: STAGES.SPEAKING,
            }
        }

        return {
            audioKey: task?.taskType?.toString(),
            textMessage: `Now we are ready to start, Task ${task?.taskType || 1}`,
            nextStage: STAGES.READING,
        }
    }, [stage, task?.taskType])

    /**
     * Воспроизводит аудио или синтезированную речь для начала задания
     * Использует записанное аудио или TTS как fallback
     */
    const handlePlaySpeech = useCallback(async () => {
        const config = handleSpeechMessage()
        const audioUrl = speechUrls[config.audioKey]

        const speakWithTTS = async () => {
            await new Promise((resolve, reject) => {
                speakTTS(config.textMessage, (error) => {
                    error ? reject(error) : resolve()
                })
            })
            setStage(config.nextStage)
            onComplete?.()
        }

        if (!audioUrl) {
            console.warn("Preparation: No audio URL found, using TTS")
            await speakWithTTS()
            return
        }

        try {
            await new Promise((resolve, reject) => {
                speakAudio(audioUrl, (error) => {
                    error ? reject(error) : resolve()
                })
            })
            setStage(config.nextStage)
            onComplete?.()
        } catch (error) {
            console.error("Preparation: Audio URL error occurred, fallback to TTS")
            await speakWithTTS()
        }
    }, [handleSpeechMessage, speakAudio, speakTTS, setStage, onComplete])

    /**
     * Возвращает текстовое сообщение для отображения в зависимости от стадии
     * @returns {string} Сообщение для пользователя
     */
    const handleTimerMessage = useCallback(() => {
        if (stage === STAGES.PREPARE_SPEAKING) {
            return "Get ready for the answer"
        }
        return `Get ready for the task ${task?.taskType || "Undefined"}`
    }, [stage, task?.taskType])

    /**
     * Форматирует секунды в строку для отображения
     * @param {number} seconds - Количество секунд
     * @returns {string} Отформатированное время
     */
    const formatDisplayTime = useCallback((seconds) => {
        return `0${seconds} sec.`
    }, [])

    /**
     * Обрабатывает завершение таймера, запуская речь
     */
    const handleTimerComplete = useCallback(() => {
        if (!timerCompleted) {
            setTimerCompleted(true)
            handlePlaySpeech()
        }
    }, [timerCompleted, handlePlaySpeech])

    // Запуск таймера
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
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [timeLeft, timerCompleted])

    // Обработка завершения таймера
    useEffect(() => {
        if (timeLeft === 0 && !timerCompleted) {
            handleTimerComplete()
        }
    }, [timeLeft, timerCompleted, handleTimerComplete])

    // Сброс состояния при изменении стадии или задания
    useEffect(() => {
        setTimeLeft(duration)
        setTimerCompleted(false)
        spokenRef.current = false

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
        }
    }, [stage, duration, task?.id])

    return (
        <div className="timer_conatiner">
            <div className="timer_progress_bar">
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progress_bar_back" cx="50%" cy="50%" r="45%"/>
                </svg>
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle 
                        className="progress_bar" 
                        cx="50%" 
                        cy="50%" 
                        r="45%" 
                        strokeLinecap="round"
                        strokeDasharray="300%"
                    />
                </svg>
                <div className="timer_progress_bar_shdaow">
                    <div className="progress_bar_shadow_back"></div>
                </div>
                <span className="timer_digit">{formatDisplayTime(timeLeft)}</span>
            </div>
            <span className="timer_message">{handleTimerMessage()}</span>
        </div>
    )
}