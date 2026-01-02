import "./session_style.css"
import "./session_media_style.css"

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
 * @returns {JSX.Element}
 */
export const SessionPage = () => {
    const navigate = useNavigate()
    const location = useLocation()
    
    const variant = location.state || {}

    const audioResultsRef = useRef([])

    const [allTasks, setAllTasks] = useState([])
    const [currentTask, setCurrentTask] = useState(null)
    const [microphoneCheck, setMicrophoneCheck] = useState(false)
    const [stage, setStage] = useState(STAGES.PREPARE_READING)
    const [isLoading, setIsLoading] = useState(false)

    const { speak: speakTTS } = useLessonSpeaker()
    const { speakAudio } = useAudioSpeaker()

    /**
     * Карта компонентов для рендеринга заданий по типам
     * @type {Object<number, React.ComponentType>}
     */
    const tasksComponents = useMemo(() => ({
        1: FirstTask,
        2: SecondTask,
        3: ThirdTask,
        4: FourthTask,
    }), [])

    /**
     * Удаляем Replain со страницы SessionPage чтобы он не мешал прохождению заданий
     */
    useEffect(() => {
        // Скрываем виджет Replain на странице сессии
        const style = document.createElement('style');
        style.id = 'replain-hide';
        style.innerHTML = `
            .replain-widget,
            [class*="replain"],
            [id*="replain"] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                pointer-events: none !important;
            }
        `;
        document.head.appendChild(style);
        
        return () => {
            // Удаляем стиль при размонтировании
            const styleElement = document.getElementById('replain-hide');
            if (styleElement) {
                styleElement.remove();
            }
        };
    }, []);

    /**
     * Загружает задания для выбранного варианта
     * Определяет текущее задание в зависимости от режима (экзамен или отдельное задание)
     */
    useEffect(() => {
        const loadTasks = async () => {
            try {
                const response = await getTasksByVariantId(variant.id)
                setAllTasks(response.data)

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
     * Обработчик завершения проверки микрофона
     * @param {Object} microphoneData - Данные проверки микрофона
     * @param {boolean} microphoneData.hasPermission - Есть ли разрешение на использование микрофона
     * @param {string} microphoneData.testedAt - Время проверки
     */
    const handleMicrophoneCheck = useCallback((microphoneData) => {
        setMicrophoneCheck(true)
        setStage(STAGES.PREPARE_READING)
    }, [setMicrophoneCheck, setStage])

    /**
     * Обработчик завершения таймера подготовки
     * Переключает между стадиями подготовки и активного выполнения
     */
    const handlePreparationComplete = useCallback(() => {
        if (stage === STAGES.PREPARE_READING) {
            setStage(STAGES.READING)
        }

        if (stage === STAGES.PREPARE_SPEAKING) {
            setStage(STAGES.SPEAKING)
        }
    }, [stage])

    /**
     * Создает запись экзамена в системе
     * @param {string} sessionKey - Токен сессии пользователя
     * @returns {Promise<Object|undefined>} Данные созданного экзамена
     */
    const handleCreateExamEntry = useCallback(async (sessionKey) => {
        try {
            const response = await createExamRequest(variant.id, sessionKey)
            return response.data
        } catch (error) {
            console.error("Failed to create exam entry: ", error)
            return
        }
    }, [variant.id])

    /**
     * Сохраняет результат одного задания
     * @param {string} sessionKey - Токен сессии пользователя
     * @returns {Promise<Object>} Данные сохраненного задания
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
     * Сохраняет результаты всех заданий экзамена
     * @param {string} sessionKey - Токен сессии пользователя
     * @param {Object} customerExam - Данные экзамена
     */
    const handleSaveMultipleTasksResults = useCallback(async (sessionKey, customerExam) => {
        const uploadPromises = audioResultsRef.current.map((audioBlobData) => 
            saveUserTaskRequest(customerExam?.id, audioBlobData.taskId, audioBlobData.audio, sessionKey)
        )
        await Promise.all(uploadPromises)
    }, [])

    /**
     * Завершает сессию отдельного задания
     * Сохраняет результат и перенаправляет на страницу результатов задания
     */
    const handleEndTaskSession = useCallback(async () => {
        setIsLoading(true)

        try {
            const sessionKey = localStorage.getItem("token")
            if (!sessionKey) throw new Error("Not authenticated")

            const customerTask = await handleSaveSingleTaskResult(sessionKey)
            const resultUrl = `${routes.TASK_RESULT}?customerTaskId=${customerTask.id}&taskId=${currentTask.id}`
            navigate(resultUrl)
        } catch (error) {
            console.error("Task session end error: ", error)
        } finally {
            setIsLoading(false)
        }
    }, [currentTask, navigate, handleSaveSingleTaskResult])

    /**
     * Завершает сессию полного экзамена
     * Сохраняет все результаты и перенаправляет на страницу результатов экзамена
     */
    const handleEndExamSession = useCallback(async () => {
        setIsLoading(true)

        try {
            const sessionKey = localStorage.getItem("token")
            if (!sessionKey) throw new Error("Not authenticated")

            const customerExam = await handleCreateExamEntry(sessionKey)
            await handleSaveMultipleTasksResults(sessionKey, customerExam)
            const resultUrl = `/results?variantId=${variant.id}&examId=${customerExam.id}`
            navigate(resultUrl)
        } catch (error) {
            console.error("Exam session end error: ", error)
        } finally {
            setIsLoading(false)
        }
    }, [variant.id, navigate, handleCreateExamEntry, handleSaveMultipleTasksResults])

    /**
     * Воспроизводит сообщение об окончании теста
     * @param {Function} [callback] - Функция для выполнения после сообщения
     */
    const handleEndSpeech = useCallback((callback) => {
        const endMessage = async () => {
            if (!speechUrls.TEST_END) {
                console.warn("End speech: No audio URL found, using TTS")
                await new Promise((resolve, reject) => {
                    speakTTS("This is the end of the test", (error) => {
                        error ? reject(error) : resolve()
                    })
                })
                if (callback) callback()
                return
            }

            try {
                await new Promise((resolve, reject) => {
                    speakAudio(speechUrls.TEST_END, (error) => {
                        error ? reject(error) : resolve()
                    })
                })
                if (callback) callback()
            } catch (error) {
                console.error("End speech: Audio URL error occurred, fallback to TTS")
                await new Promise((resolve, reject) => {
                    speakTTS("This is the end of the test", (error) => {
                        error ? reject(error) : resolve()
                    })
                })
                if (callback) callback()
            }
        }

        endMessage()
    }, [speakTTS, speakAudio])

    /**
     * Обработчик перехода к следующему заданию или завершения сессии
     * Сохраняет аудио результат и определяет следующий шаг
     * @param {Object} audioResult - Результат аудиозаписи задания
     * @param {Blob} audioResult.audio - Аудио данные записи
     * @param {string} audioResult.taskId - Идентификатор задания
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
    }, [currentTask, allTasks, variant.pickedTaskType, handleEndSpeech, handleEndTaskSession, handleEndExamSession])

    /**
     * Определяет текущий компонент задания для рендеринга
     * Возвращает компонент задания или null, если условия не выполнены
     * @type {JSX.Element|null}
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
            return (
                <TaskComponent 
                    key={`task-${currentTask.id}-stage-${stage}`}
                    task={currentTask}
                    stage={stage}
                    setStage={setStage}
                    handleNextTask={handleNextTask}
                />
            )
        }

        return null
    }, [currentTask, stage, setStage, handleNextTask, tasksComponents, microphoneCheck, isLoading])

    /**
     * Определяет, какой компонент рендерить на основе текущего состояния
     * @type {JSX.Element}
     */
    const handleRenderComponent = useMemo(() => {
        // Этап проверки микрофона
        if (!microphoneCheck) {
            return <MicroPerfomanceCheck onComplete={handleMicrophoneCheck}/>
        }

        // Этап подготовки перед чтением/говорением
        if (stage === STAGES.PREPARE_READING || stage === STAGES.PREPARE_SPEAKING) {
            return (
                <PreparationTimer
                    duration={timerUtils.getPreparationTimer(currentTask.taskType)}
                    stage={stage}
                    setStage={setStage}
                    task={currentTask}
                    onComplete={handlePreparationComplete}
                />
            )
        }

        // Активный этап выполнения задания
        return handleCurrentTaskComponent
    }, [microphoneCheck, stage, currentTask, handleCurrentTaskComponent, handleMicrophoneCheck, handlePreparationComplete])

    return (
        <>
            <Header/>
            <div className="content_wrapper">
                {handleRenderComponent}
            </div>
        </>
    )
}