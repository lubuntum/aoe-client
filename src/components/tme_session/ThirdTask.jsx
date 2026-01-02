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
 * Компонент третьего задания (вопросы после прослушивания аудио)
 * @param {Object} props - Свойства компонента
 * @param {Object} props.task - Данные задания
 * @param {Object} props.task.taskContent - Содержание задания
 * @param {string} props.task.taskContent.taskGuide - Руководство по выполнению
 * @param {string[]} props.task.taskContent.speaker - Текст вступления
 * @param {string} props.task.taskContent.speakerRecord - Путь к аудио-записи вступления
 * @param {string[]} props.task.taskContent.questions - Список вопросов
 * @param {string[]} props.task.taskContent.questionRecords - Пути к аудио-записям вопросов
 * @param {string} props.task.id - Идентификатор задания
 * @param {number} props.stage - Текущая стадия выполнения
 * @param {function(number): void} props.setStage - Функция установки стадии
 * @param {function({audio: Blob, taskId: string}): void} props.handleNextTask - Обработчик перехода к следующему заданию
 * @returns {JSX.Element}
 */
export const ThirdTask = ({ task, stage, setStage, handleNextTask }) => {
    const [questionNumber, setQuestionNumber] = useState(0)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [timerKey, setTimerKey] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)

    const { audioBlobRef, startRecording, stopRecording } = useLessonMediaRecorder(false)
    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()
    const { playAndEvent } = useSoundSpeaker(notification)

    const speakIntroduction = useCallback(async () => {
        if (!task.taskContent.speakerRecord) {
            console.warn("Question 3: No audio URL for introduction found, using TTS")
            await new Promise((resolve, reject) => {
                speakTTS(task.taskContent.speaker[0], (error) => {
                    error ? reject(error) : resolve()
                })
            })
            setStage(STAGES.PREPARE_SPEAKING)
            return
        }

        try {
            await new Promise((resolve, reject) => {
                speakAudio(`${SERVER_API_URL}/${task.taskContent.speakerRecord}`, (error) => {
                    error ? reject(error) : resolve()
                })
            })
            setStage(STAGES.PREPARE_SPEAKING)
        } catch (error) {
            console.error("Question 3: Audio URL error occured, fallback to TTS")
            await new Promise((resolve, reject) => {
                speakTTS(task.taskContent.speaker[0], (error) => {
                    error ? reject(error) : resolve()
                })
            })
            setStage(STAGES.PREPARE_SPEAKING)
        }
    }, [task, speakAudio, speakTTS, setStage])

    const speakQuestion = useCallback(async () => {
        if (!task.taskContent.questionRecords) {
            console.warn("Question 3: No audio URLS for questions found, using TTS")
            await new Promise((resolve, reject) => {
                playAndEvent(() => {
                    speakTTS(task.taskContent.questions[questionNumber], (error) => {
                        error ? reject(error) : resolve()
                    })
                })
            })
            playAndEvent(() => {
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
            return
        }

        try {
            await new Promise((resolve, reject) => {
                playAndEvent(() => {
                    speakAudio(`${SERVER_API_URL}/${task.taskContent.questionRecords[questionNumber]}`, (error) => {
                        error ? reject(error) : resolve()
                    })
                })
            })
            playAndEvent(() => {
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        } catch (error) {
            console.error("Question 3: Audio URL error occured, fallback to TTS")
            await new Promise((resolve, reject) => {
                playAndEvent(() => {
                    speakTTS(task.taskContent.questions[questionNumber], (error) => {
                        error ? reject(error) : resolve()
                    })
                })
            })
            playAndEvent(() => {
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        }
    }, [task, questionNumber, playAndEvent, speakAudio, speakTTS, startRecording])

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

    useEffect(() => {
        if (stage === STAGES.READING) {
            task.hideQuestions = true
            setIsTimerActive(true)
            speakIntroduction()
        }

        if (stage === STAGES.SPEAKING) {
            task.questionNumber = questionNumber
        }

        if (stage === STAGES.SPEAKING && !isSpeaking) {
            speakQuestion()
        }
    }, [stage, task, questionNumber, speakIntroduction, speakQuestion, isSpeaking])

    return (
        <div className="task_container">
            <div className="task_content">
                <div className="task_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_divider"></div>

                <div className="task_icon">
                    <Hearing className="svg_icon"/>
                </div>

                <div className="task_list">
                    {!task.hideQuestions && task.taskContent.questions.map((item, i) => (
                        <div key={i}>{i + 1}. {item}</div>
                    ))}
                </div>
            </div>

            {stage === STAGES.READING && 
                <TimerTrack 
                    key={timerKey} 
                    timerActive={isTimerActive} 
                    task={task} 
                    stage={stage} 
                    action={() => {}} 
                />
            }

            {stage === STAGES.SPEAKING && !isSpeaking &&
                <TimerTrack 
                    key={timerKey} 
                    timerActive={isTimerActive} 
                    task={task} 
                    stage={stage} 
                    action={() => {}} 
                />
            }
            
            {stage === STAGES.SPEAKING && isSpeaking &&
                <TimerTrack 
                    key={timerKey} 
                    timerActive={isTimerActive} 
                    task={task} 
                    stage={stage} 
                    action={handleNextQuestion} 
                />
            }
        </div>
    )
}