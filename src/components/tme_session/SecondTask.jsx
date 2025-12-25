import { useCallback, useEffect, useRef, useState } from "react"
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
 * @typedef {Object} TaskContentTopicTwo
 * @property {string} [taskGuide] - Руководство по выполнению задания
 * @property {string[]} [taskText] - Текст задания (массив строк)
 * @property {string[]} [topics] - Список вопросов/тем
 * @property {string} [imgTitle] - Заголовок изображения
 * @property {string} [img] - Путь к изображению
 */

/**
 * @typedef {Object} Task
 * @property {number} taskType - Тип задания (1-4)
 * @property {string} id - Идентификатор задания
 * @property {TaskContentTopicTwo} [taskContent] - Содержание задания
 * @property {number} [topicNumber] - Номер текущего вопроса (для второго задания)
 */

/**
 * @typedef {Object} SecondTaskProps
 * @property {Task} task - Данные задания
 * @property {number} stage - Текущая стадия выполнения задания (из STAGES)
 * @property {function(stage: number): void} setStage - Функция установки стадии
 * @property {function(audioResult: {audio: Blob, taskId: string}): void} handleNextTask - Обработчик перехода к следующему заданию
 */

/**
 * Компонент 2 задания (Ответы на вопросы с таймером)
 * @param {SecondTaskProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент 2 задания
 */
export const SecondTask = ({task, stage, setStage, handleNextTask}) => {
    /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} */
    const [topicNumber, setTopicNumber] = useState(0)
    
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
     * Озвучивание номера и содержания текущего вопроса
     * @returns {Promise<void>}
     */
    const speakTopicNumber = useCallback(async () => {
        if (!topicsTaskTwoUrls) {
            console.warn("Question 2: No audio URLS for topics found, using TTS")
            await new Promise((res, rej) => {
                speakTTS(`Question ${topicNumber + 1}`, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            playAndEvent(() => {            
                console.log("Question 2: TTS callback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
            return
        }

        try {
            await new Promise((res, rej) => {
                speakAudio(topicsTaskTwoUrls[topicNumber + 1], (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            playAndEvent(() => {            
                console.log("Question 2: Audio URL callback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })

        } catch (error) {
            console.error("Question 2: Audio URL error occured, fallback to TTS")
            await new Promise((res, rej) => {
                speakTTS(`Question ${topicNumber + 1}`, (error) => {
                    if (error) {
                        rej(error)
                    } else {
                        res()
                    }
                })
            })
            playAndEvent(() => {            
                console.log("Question 2: TTS fallback executed")
                setIsSpeaking(true)
                setIsTimerActive(true)
                setTimerKey(prev => prev + 1)
                startRecording()
            })
        }
    }, [topicNumber, speakAudio, speakTTS, playAndEvent, startRecording])

    /**
     * Обработчик перехода к следующему вопросу или завершению задания
     * @returns {Promise<void>}
     */
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

    /**
     * Эффект для управления стадиями и логикой задания
     * @returns {void}
     */
    useEffect(() => {
        if (stage === STAGES.READING)
            setIsTimerActive(true)

        if (stage === STAGES.SPEAKING) 
            task.topicNumber = topicNumber

        if (stage === STAGES.SPEAKING && !isSpeaking)
            speakTopicNumber()
    }, [stage, topicNumber, speakTopicNumber, isSpeaking])

    return (<>
        <div className="task_container">
            <div className="task_content">
                <div className="task_number">
                    Task {task?.taskType}
                </div>

                <div className="task_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"} ({task?.taskContent?.taskText[1] || "No description available"})
                </div>

                <div className="task_divider"></div>

                <div className="task_text">
                    {task?.taskContent?.taskText[0] || "No text available"}
                </div>
            
                <div className="task_list">
                    
                    {(task?.topicNumber === undefined && stage === STAGES.READING) && task?.taskContent.topics.map((item, i) => (<div>{i+1}. {item}</div>))}

                    {(task?.topicNumber !== undefined && stage === STAGES.SPEAKING) && <div>{task?.topicNumber + 1}. {task?.taskContent.topics[task.topicNumber]}</div>}
                </div>

                <div className="task_img_container">
                    <div className="task_img">
                        <div className="task_img_title">
                            {task?.taskContent?.imgTitle || "No image title available"}
                        </div>

                        <div className="task_image">
                            <img src={`${SERVER_API_URL}/${task?.taskContent?.img}`} alt=""/>
                        </div>
                    </div>
                </div>
            </div>

            {stage === STAGES.READING && 
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {setStage(STAGES.PREPARE_SPEAKING)} }/>}

            {(stage === STAGES.SPEAKING && !isSpeaking) &&
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {} }/>}
            
            {(stage === STAGES.SPEAKING && isSpeaking) &&
                <TimerTrack key={timerKey} timerActive={isTimerActive} task={task} stage={stage} action={ () => {handleNextTopic()} }/>}
        </div>
    </>)
}