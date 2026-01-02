import { useCallback, useEffect, useState } from "react"
import { SERVER_API_URL } from "../../config"
import { TimerTrack } from "./TimerTrack"
import useLessonMediaRecorder from "../../hooks/useLessonMediaRecorder"
import { useLessonSpeaker } from "../../hooks/sound/useLessonSpeaker"
import { useAudioSpeaker } from "../../hooks/sound/useAudioSpeaker"
import { useSoundSpeaker } from "../../hooks/sound/useSoundSpeaker"
import { topicsTaskTwoUrls } from "../../speechUrls"
import notification from "../../res/wavs/beep.wav"
import { STAGES } from "./SessionPage"

/**
 * Компонент второго задания (ответы на вопросы с таймером)
 * @param {Object} props - Свойства компонента
 * @param {Object} props.task - Данные задания
 * @param {Object} props.task.taskContent - Содержание задания
 * @param {string[]} props.task.taskContent.topics - Список вопросов/тем
 * @param {string[]} props.task.taskContent.taskText - Текст задания
 * @param {string} props.task.taskContent.taskGuide - Руководство по выполнению
 * @param {string} props.task.taskContent.imgTitle - Заголовок изображения
 * @param {string} props.task.taskContent.img - Путь к изображению
 * @param {string} props.task.id - Идентификатор задания
 * @param {number} props.stage - Текущая стадия выполнения
 * @param {function(number): void} props.setStage - Функция установки стадии
 * @param {function({audio: Blob, taskId: string}): void} props.handleNextTask - Обработчик перехода к следующему заданию
 * @returns {JSX.Element}
 */
export const SecondTask = ({task, stage, setStage, handleNextTask}) => {
    const [topicNumber, setTopicNumber] = useState(0)
    const [isSpeaking, setIsSpeaking] = useState(false)
    const [timerKey, setTimerKey] = useState(0)
    const [isTimerActive, setIsTimerActive] = useState(false)

    const { audioBlobRef, startRecording, stopRecording } = useLessonMediaRecorder(false)
    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()
    const { playAndEvent } = useSoundSpeaker(notification)

    const speakTopicNumber = useCallback(async () => {
        if (!topicsTaskTwoUrls) {
            console.warn("Question 2: No audio URLS for topics found, using TTS")
            await new Promise((resolve, reject) => {
                speakTTS(`Question ${topicNumber + 1}`, (error) => {
                    error ? reject(error) : resolve()
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
                speakAudio(topicsTaskTwoUrls[topicNumber + 1], (error) => {
                    error ? reject(error) : resolve()
                })
            })
            playAndEvent(() => {            
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        } catch (error) {
            console.error("Question 2: Audio URL error occured, fallback to TTS")
            await new Promise((resolve, reject) => {
                speakTTS(`Question ${topicNumber + 1}`, (error) => {
                    error ? reject(error) : resolve()
                })
            })
            playAndEvent(() => {            
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        }
    }, [topicNumber, speakAudio, speakTTS, playAndEvent, startRecording])

    const handleNextTopic = useCallback(async () => {
        await stopRecording()

        if (topicNumber + 1 >= task?.taskContent?.topics?.length) {
            handleNextTask({
                audio: audioBlobRef.current,
                taskId: task.id,
            })
            return
        }

        setIsSpeaking(false)
        setTopicNumber(prev => prev + 1)
        setIsTimerActive(false)
    }, [stopRecording, audioBlobRef, task, topicNumber, handleNextTask])

    useEffect(() => {
        if (stage === STAGES.READING) {
            setIsTimerActive(true)
        }

        if (stage === STAGES.SPEAKING) {
            task.topicNumber = topicNumber
        }

        if (stage === STAGES.SPEAKING && !isSpeaking) {
            speakTopicNumber()
        }
    }, [stage, task, topicNumber, speakTopicNumber, isSpeaking])

    return (
        <div className="task_container">
            <div className="task_content">
                <div className="task_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"} 
                    ({task?.taskContent?.taskText[1] || "No description available"})
                </div>

                <div className="task_divider"></div>

                <div className="task_text">
                    {task?.taskContent?.taskText[0] || "No text available"}
                </div>
            
                <div className="task_list">
                    {task?.topicNumber === undefined && stage === STAGES.READING && 
                        task?.taskContent?.topics?.map((item, i) => (
                            <div key={i}><span>{i+1}.</span> {item}</div>
                        ))}
                    
                    {task?.topicNumber !== undefined && stage === STAGES.SPEAKING && 
                        <div>{task?.topicNumber + 1}. {task?.taskContent?.topics[task.topicNumber]}</div>}
                </div>

                <div className="task_img_container">
                    <div className="task_img">
                        <div className="task_img_title">
                            {task?.taskContent?.imgTitle || "No image title available"}
                        </div>

                        <div className="task_image">
                            <img 
                                src={`${SERVER_API_URL}/${task?.taskContent?.img}`} 
                                alt={task?.taskContent?.imgTitle || "Task image"}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {stage === STAGES.READING && 
                <TimerTrack 
                    key={timerKey} 
                    timerActive={isTimerActive} 
                    task={task} 
                    stage={stage} 
                    action={() => setStage(STAGES.PREPARE_SPEAKING)} 
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
                    action={handleNextTopic} 
                />
            }
        </div>
    )
}