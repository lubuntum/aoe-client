import { useCallback, useEffect, useState } from "react"
import { ReactComponent as Hearing } from "../../../src/res/icons/hearing_24dp_gi.svg"
import { TimerTrack } from "./TimerTrack"
import useLessonMediaRecorder from "../../hooks/useLessonMediaRecorder"
import { useLessonSpeaker } from "../../hooks/sound/useLessonSpeaker"
import { useAudioSpeaker } from "../../hooks/sound/useAudioSpeaker"
import { useSoundSpeaker } from "../../hooks/sound/useSoundSpeaker"
import notification from "../../res/wavs/beep.wav"
import { STAGES } from "./SessionPage"
import { SERVER_API_URL } from "../../config"

/**
 * @typedef {Object} TaskContentTopicThree
 * @property {string} [taskGuide] - Руководство по выполнению задания
 * @property {string[]} [speaker] - Текст вступления/речи спикера
 * @property {string} [speakerRecord] - Путь к аудио-записи вступления
 * @property {string[]} [questions] - Список вопросов
 * @property {string[]} [questionRecords] - Пути к аудио-записям вопросов
 */

/**
 * @typedef {Object} Task
 * @property {number} taskType - Тип задания (1-4)
 * @property {string} id - Идентификатор задания
 * @property {TaskContentTopicThree} taskContent - Содержание задания
 * @property {number} [questionNumber] - Номер текущего вопроса
 * @property {boolean} [hideQuestions] - Флаг скрытия вопросов
 */

/**
 * @typedef {Object} ThirdTaskProps
 * @property {Task} task - Данные задания
 * @property {number} stage - Текущая стадия выполнения задания (из STAGES)
 * @property {function(stage: number): void} setStage - Функция установки стадии
 * @property {function(audioResult: {audio: Blob, taskId: string}): void} handleNextTask - Обработчик перехода к следующему заданию
 */

/**
 * Компонент 3 задания (Вопросы после прослушивания аудио)
 * @param {ThirdTaskProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент 3 задания
 */
export const ThirdTask = ({ task, stage, setStage, handleNextTask }) => {
    /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} */
    const [questionNumber, setQuestionNumber] = useState(0)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isSpeaking, setIsSpeaking] = useState(false)
    
    /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} */
    const [timerKey, setTimerKey] = useState(0)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isTimerActive, setIsTimerActive] = useState(false)

    const { audioBlobRef, startRecording, stopRecording } = useLessonMediaRecorder(false)

    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()
    const { playAndEvent } = useSoundSpeaker(notification)

    /**
     * Озвучивание вступления/информации от спикера
     * @returns {Promise<void>}
     */
    const speakIntroduction = useCallback(async () => {
        if (!task.taskContent.speakerRecord) {
            console.warn("Question 3: No audio URL for introduction found, using TTS")
            await new Promise((res, rej) => {
                speakTTS(task.taskContent.speaker[0], (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Question 3: TTS callback executed")
            setStage(STAGES.PREPARE_SPEAKING)
            return
        }

        try {
            await new Promise((res, rej) => {
                speakAudio(`${SERVER_API_URL}/${task.taskContent.speakerRecord}`, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Question 3: Audio URL callback executed")
            setStage(STAGES.PREPARE_SPEAKING)

        } catch (error) {
            console.error("Question 3: Audio URL error occured, fallback to TTS")
            await new Promise((res, rej) => {
                speakTTS(task.taskContent.speaker[0], (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            console.log("Question 3: TTS fallback executed")
            setStage(STAGES.PREPARE_SPEAKING)
        }
    }, [task, speakAudio, speakTTS, setStage])

    /**
     * Озвучивание текущего вопроса
     * @returns {Promise<void>}
     */
    const speakQuestion = useCallback(async () => {
        if (!task.taskContent.questionRecords) {
            console.warn("Question 3: No audio URLS for questions found, using TTS")
            await new Promise((res, rej) => {
                playAndEvent(() => {
                    speakTTS(task.taskContent.questions[questionNumber], (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
            })
            playAndEvent(() => {
                console.log("Question 3: TTS callback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
            return
        }

        try {
            await new Promise((res, rej) => {
                playAndEvent(() => {
                    speakAudio(`${SERVER_API_URL}/${task.taskContent.questionRecords[questionNumber]}`, (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
            })
            playAndEvent(() => {
                console.log("Question 3: Audio URL callback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })

        } catch (error) {
            console.error("Question 3: Audio URL error occured, fallback to TTS")
            await new Promise((res, rej) => {
                playAndEvent(() => {
                    speakTTS(task.taskContent.questions[questionNumber], (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
            })
            playAndEvent(() => {
                console.log("Question 3: TTS fallback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        }
    }, [task, questionNumber, playAndEvent, speakAudio, speakTTS, startRecording])

    /**
     * Обработчик перехода к следующему вопросу или завершению задания
     * @returns {Promise<void>}
     */
    const handleNextQuestion = useCallback(async () => {
        await stopRecording()

        if (questionNumber + 1 >= task?.taskContent?.questions?.length) {
            handleNextTask({
                audio: audioBlobRef.current,
                taskId: task.id,
            })
            return
        }

        setIsSpeaking(false)
        setQuestionNumber(prev => prev + 1)
        setIsTimerActive(false)
    }, [stopRecording, audioBlobRef, task, questionNumber, handleNextTask])

    /**
     * Эффект для управления стадиями и логикой задания
     * @returns {void}
     */
    useEffect(() => {
        if (stage === STAGES.READING) {
            task.hideQuestions = true
            setIsTimerActive(true)
            speakIntroduction()
        }

        if (stage === STAGES.SPEAKING)
            task.questionNumber = questionNumber

        if (stage === STAGES.SPEAKING && !isSpeaking)
            speakQuestion()
    }, [stage, task, questionNumber, speakIntroduction, speakQuestion, isSpeaking])

    return (<>
        <div className="task_container">
            <div className="task_content">
                <div className="task_number">
                    Task {task?.taskType}
                </div>

                <div className="task_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_divider"></div>

                <div className="task_icon">
                    <Hearing className="svg_icon"/>
                </div>

                <div className="task_list">
                    {!task.hideQuestions && task.taskContent.questions.map((item, i) => (<div>{i + 1}. {item}</div>))}
                </div>
            </div>

            {stage === STAGES.READING && 
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {} }/>}

            {(stage === STAGES.SPEAKING && !isSpeaking) &&
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {} }/>}
            
            {(stage === STAGES.SPEAKING && isSpeaking) &&
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {handleNextQuestion()} }/>}
        </div>
    </>)
}