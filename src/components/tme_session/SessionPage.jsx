import "./session_style.css"

import { useLocation, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { Header } from "../tme_header/Header"
import { MicroPerfomanceCheck } from "./MicroPerfomanceCheck"
import { PreparationTimer } from "./PreparationTimer"
import { FirstTask } from "./FirstTask"
import { SecondTask } from "./SecondTask"
import { ThirdTask } from "./ThirdTask"
import { FourthTask } from "./FourthTask"

import { useLessonSpeaker } from "../../hooks/sound/useLessonSpeaker"
import { useAudioSpeaker } from "../../hooks/sound/useAudioSpeaker"
import { getTasksByVariantId } from "../../modules/api_modules/variantAPI"
import { saveUserTaskRequest, createExamRequest } from "../../modules/api_modules/complitionScenarioAPI"
import { speechUrls } from "../../speechUrls"
import { timerUtils } from "../../modules/timer_modules/sessionTimerConfig"

import routes from "../../routes"

/**
 * @typedef {Object} VariantData
 * @property {string} id - Идентификатор варианта
 * @property {number} [pickedTaskType] - Выбранный тип задания (если режим отдельного задания)
 */

/**
 * @typedef {Object} Task
 * @property {string} id - Идентификатор задания
 * @property {number} taskType - Тип задания (1-4)
 * @property {boolean} [taskSession] - Флаг режима отдельного задания
 * @property {*} [data] - Данные задания
 */

/**
 * @typedef {Object} AudioResult
 * @property {Blob} audio - Аудио-данные записи пользователя
 * @property {string} taskId - Идентификатор задания
 */

/**
 * @typedef {Object} MicrophoneData
 * @property {*} [data] - Данные проверки микрофона
 */

/**
 * @typedef {Object} CustomerTask
 * @property {string} id - Идентификатор записи о выполненном задании
 */

/**
 * @typedef {Object} CustomerExam
 * @property {string} id - Идентификатор записи о выполненном экзамене
 */

/**
 * Стадии прохождения заданий
 * @enum {number}
 */
export const STAGES = {
    READING: 1,
    SPEAKING: 2,
    PREPARE_READING: 3,
    PREPARE_SPEAKING: 4,
    NEXT_TASK: 5,
}

/**
 * Компонент страницы сессии задания / экзамена
 * Управляет потоком прохождения
 * @returns {JSX.Element} - Компонент страницы сессии
 */
export const SessionPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    // Получение текущего выбранного варианта
    /** @type {VariantData} */
    const variant = location.state || {}

    // Рефы
    /** @type {React.MutableRefObject<AudioResult[]>} */
    const audioResultsRef = useRef([])

    // Состояния
    /** @type {[Task[], React.Dispatch<React.SetStateAction<Task[]>>]} */
    const [allTasks, setAllTasks] = useState([])
    
    /** @type {[Task|null, React.Dispatch<React.SetStateAction<Task|null>>]} */
    const [currentTask, setCurrentTask] = useState(null)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [microphoneCheck, setMicrophoneCheck] = useState(false)
    
    /** @type {[number, React.Dispatch<React.SetStateAction<number>>]} */
    const [stage, setStage] = useState(STAGES.PREPARE_READING)
    
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isLoading, setIsLoading] = useState(false)

    // Хуки
    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()

    /**
     * Карта компонентов для рендеринга
     * @type {Object<number, React.ComponentType>}
     */
    const tasksComponents = useMemo(() => ({
        1: FirstTask,
        2: SecondTask,
        3: ThirdTask,
        4: FourthTask,
    }), [])

    /**
     * Загружает задания по ID варианта
     * @returns {Promise<void>}
     */
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await getTasksByVariantId(variant.id)
                setAllTasks(response.data)

                /** @type {Task|undefined} */
                let foundTask
                if (variant.pickedTaskType) {
                    foundTask = response.data.find(t => t.taskType === variant.pickedTaskType)
                    foundTask.taskSession = true

                } else {
                    foundTask = response.data.find(t => t.taskType === 1)
                    foundTask.taskSession = false
                }
                setCurrentTask(foundTask)

            } catch (error) {
                console.error("Failed to load tasks: ", error)
            }
        }

        if (variant.id) {
            loadTasks()
        }
    }, [variant.id, variant.pickedTaskType])

    /**
     * Обработчик проверки микрофона
     * @param {MicrophoneData} microphoneData - Данные полученные с проверки микрофона
     * @returns {void}
     */
    const handleMicrophoneCheck = useCallback((microphoneData) => {
        console.log("Microphone data: ", microphoneData)
        setMicrophoneCheck(true)
        setStage(STAGES.PREPARE_READING)
    }, [setMicrophoneCheck, setStage])

    /**
     * Обработчик завершения таймера подготовки
     * @returns {void}
     */
    const handlePreparationComplete = useCallback(() => {
        if (stage === STAGES.PREPARE_READING)
            setStage(STAGES.READING)

        if (stage === STAGES.PREPARE_SPEAKING)
            setStage(STAGES.SPEAKING)
    }, [stage])

    /**
     * Обработчик завершения речи с сообщением об окончании теста
     * @param {Function} [callback] - Функция для выполнения после сообщения
     * @returns {Promise<void>}
     */
    const handleEndSpeech = useCallback((callback) => {
        const endMessage = async () => {
            if (!speechUrls.TEST_END) {
                console.warn("End speech: No audio URL found, using TTS")
                await new Promise((res, rej) => {
                    speakTTS("This is the end of the test", (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
                console.log("End speech: TTS callback executed")
                if (callback) callback()
                return
            }

            try {
                await new Promise((res, rej) => {
                    speakAudio(speechUrls.TEST_END, (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
                console.log("End speech: Audio URL callback executed")
                if (callback) callback()

            } catch (error) {
                console.error("End speech: Audio URL error occured, fallback to TTS")
                await new Promise((res, rej) => {
                    speakTTS("This is the end of the test", (error) => {
                        if (error) {
                            rej(error)
                        } else {
                            res()
                        }
                    })
                })
                console.log("End speech: TTS callback executed")
                if (callback) callback()
            }
        }

        endMessage()
    }, [speakTTS, speakAudio])

    /**
     * Переход к следующему заданию или завершение сессии
     * @param {AudioResult} audioResult - Результат аудиозаписи
     * @returns {void}
     */
    const handleNextTask = useCallback((audioResult) => {
        audioResultsRef.current.push(audioResult)

        if (variant.pickedTaskType) {
            handleEndSpeech(handleEndTaskSession)
            return
        }

        if (currentTask.taskType >= 4) {
            handleEndSpeech(handleEndExamSession)
            return
        }

        setCurrentTask(allTasks.find(t => t.taskType === currentTask.taskType + 1))
        setStage(STAGES.PREPARE_READING)
    }, [currentTask, allTasks, variant.pickedTaskType, handleEndSpeech])

    /**
     * Создание записи экзамена
     * @param {string} sessionKey - Токен сессии
     * @returns {Promise<CustomerExam|undefined>} Данные экзамена
     */
    const handleCreteExamEntry = useCallback(async (sessionKey) => {
        try {
            const response = await createExamRequest(variant.id, sessionKey)
            return response.data

        } catch (error) {
            console.error("Failed to create exam entry: ", error)
            return
        }
    }, [variant.id])

    /**
     * Завершение сессии задания
     * @returns {Promise<void>}
     */
    const handleEndTaskSession = useCallback(async () => {
        setIsLoading(true)

        try {
            const sessionKey = localStorage.getItem("token")
            if (!sessionKey)
                throw new Error("Not authenticated")

            /** @type {CustomerTask} */
            const customerTask = await handleSaveSingleTaskResult(sessionKey)
            const resultUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTask.id}&taskId=${currentTask.id}`
            navigate(resultUrl)

        } catch (error) {
            console.error("Task session end error: ", error)

        } finally {
            setIsLoading(false)
        }
    }, [currentTask, navigate])

    /**
     * Завершение сессии экзамена
     * @returns {Promise<void>}
     */
    const handleEndExamSession = useCallback(async () => {
        setIsLoading(true)

        try {
            const sessionKey = localStorage.getItem("token")
            if (!sessionKey)
                throw new Error("Not authenticated")

            /** @type {CustomerExam} */
            const customerExam = await handleCreteExamEntry(sessionKey)
            await handleSaveMultipleTasksResults(sessionKey, customerExam)
            const resultUrl = `/results?variantId=${variant.id}&examId=${customerExam.id}`
            navigate(resultUrl)

        } catch (error) {
            console.error("Exam session end error: ", error)

        } finally {
            setIsLoading(false)
        }
    }, [variant.id, navigate])

    /**
     * Сохранение результатов одного задания
     * @param {string} sessionKey - Токен сессии
     * @returns {Promise<CustomerTask>} Данные сохраненного задания
     */
    const handleSaveSingleTaskResult = useCallback(async (sessionKey) => {
        const response = await saveUserTaskRequest(
            null,
            audioResultsRef.current[0].taskId,
            audioResultsRef.current[0].audio,
            sessionKey,
        )

        return response.data
    }, [])

    /**
     * Сохранение результатов всех заданий
     * @param {string} sessionKey - Токен сессии
     * @param {CustomerExam} customerExam - Данные экзамена
     * @returns {Promise<void>}
     */
    const handleSaveMultipleTasksResults = useCallback(async (sessionKey, customerExam) => {
        const uploadPromises = audioResultsRef.current.map((audioBlobData) => 
            saveUserTaskRequest(customerExam?.id, audioBlobData.taskId, audioBlobData.audio, sessionKey)
        )

        await Promise.all(uploadPromises)
    }, [])

    /**
     * Определяет текущий компонент задания на основе типа задания
     * @returns {JSX.Element|null} - Компонент задания или null
     */
    const handleCurrentTaskComponent = useMemo(() => {
        if (!currentTask || !microphoneCheck || isLoading || !tasksComponents[currentTask.taskType]) 
            return null

        const TaskComponent = tasksComponents[currentTask.taskType]

        if (!TaskComponent) {
            console.error("No component found for task type")
            return null
        }

        if (stage === STAGES.READING || stage === STAGES.SPEAKING) {
            return (<TaskComponent 
                     key={`task-${currentTask.id}-stage-${stage}`}
                     task={currentTask}
                     stage={stage}
                     setStage={setStage}
                     handleNextTask={handleNextTask}/>)
        }

        return null
                 
    }, [currentTask, stage, setStage, handleNextTask, tasksComponents])

    /**
     * Определяет, какой компонент рендерить на основе состояний
     * @returns {JSX.Element} - Компонент для отображения
     */
    const handleRenderComponent = useMemo(() => {
        // Этап проверки микрофона
        if (!microphoneCheck)
            return <MicroPerfomanceCheck
                    onComplete={handleMicrophoneCheck}/>

        // Этап подготовки (5 сек таймер)
        if (stage === STAGES.PREPARE_READING || stage === STAGES.PREPARE_SPEAKING)
            return <PreparationTimer
                    duration={timerUtils.getPreparationTimer(currentTask.taskType)}
                    stage={stage}
                    setStage={setStage}
                    task={currentTask}
                    onComplete={handlePreparationComplete}/>

        return handleCurrentTaskComponent
    }, [microphoneCheck, isLoading, stage, currentTask, handleCurrentTaskComponent, handleMicrophoneCheck, handlePreparationComplete])

    return (<>
        <Header/>

        <div className="content_wrapper">
            {handleRenderComponent}
        </div>
    </>)
}