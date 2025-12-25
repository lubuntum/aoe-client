import "./result_style.css"

import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { Header } from "../tme_header/Header"
import { Footer } from "../tme_footer/Footer"
import { useCallback, useEffect, useMemo, useState, useRef } from "react"
import { getTaskByTaskId } from "../../modules/api_modules/taskAPI"
import { getCustomerTaskByCustomerTaskId } from "../../modules/api_modules/resultAPI"
import { SERVER_API_URL } from "../../config"
import { Btn } from "../tme_reusable/Btn"
import { BtnLink } from "../tme_reusable/BtnLink"
import { Accordion } from "../tme_reusable/Accordion"
import { FirstTaskDetails } from "./FirstTaskDetails"
import { getTasksByVariantId } from "../../modules/api_modules/variantAPI"
import { SecondTaskDetails } from "./SecondTaskDetails"
import { ThirdTaskDetails } from "./ThirdTaskDetails"
import { FourthTaskDetails } from "./FourthTaskDetails"

/**
 * Константа для сопоставления типов заданий с соответствующими компонентами отображения деталей
 * @constant {Object<number, React.ComponentType>}
 */
const TASK_DETAIL_COMPONENTS = {
    1: FirstTaskDetails,
    2: SecondTaskDetails,
    3: ThirdTaskDetails,
    4: FourthTaskDetails,
}

/**
 * Тип данных задания
 * @typedef {Object} TaskData
 * @property {number} id - Уникальный идентификатор задания
 * @property {number} taskType - Тип задания (1-4)
 * @property {number} variantId - Идентификатор варианта, к которому относится задание
 * @property {string} [audioPath] - Путь к аудиофайлу задания (опционально)
 */

/**
 * Тип данных ответа пользователя на задание
 * @typedef {Object} CustomerTaskData
 * @property {number} id - Уникальный идентификатор записи ответа пользователя
 * @property {string} audioPath - Путь к аудиофайлу с ответом пользователя
 * @property {string} createdAt - Дата и время создания ответа
 * @property {number} customerId - Идентификатор пользователя
 * @property {number} taskId - Идентификатор задания
 */

/**
 * Пропсы компонента деталей задания
 * @typedef {Object} TaskDetailsProps
 * @property {TaskData} task - Объект данных задания
 */

/**
 * Компонент страницы результатов выполнения одного задания пользователем.
 * Отображает информацию о задании, аудиоответ пользователя и предоставляет
 * функционал для взаимодействия с результатом.
 * 
 * @component
 * @returns {React.JSX.Element} Отрисованный компонент страницы результатов
 * 
 * @example
 * // Доступ через URL с параметрами:
 * // /single-task-result?taskId=123&customerTaskId=456
 */
export const SingleTaskResultPage = () => {
    const { isAuth, checkAuth } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const isLoadingRef = useRef(false)

    /** @type {[TaskData|null, React.Dispatch<React.SetStateAction<TaskData|null>>]} */
    const [task, setTask] = useState(null)
    /** @type {[TaskData|null, React.Dispatch<React.SetStateAction<TaskData|null>>]} */
    const [currentTask, setCurrentTask] = useState(null)
    /** @type {[CustomerTaskData|null, React.Dispatch<React.SetStateAction<CustomerTaskData|null>>]} */
    const [customerTask, setCustomerTask] = useState(null)
    /** @type {[boolean, React.Dispatch<React.SetStateAction<boolean>>]} */
    const [isLoading, setIsLoading] = useState(true)
    /** @type {[string|null, React.Dispatch<React.SetStateAction<string|null>>]} */
    const [error, setError] = useState(null)

    /**
     * Извлекает параметры taskId и customerTaskId из строки запроса URL
     * @type {Readonly<{taskId: string|null, customerTaskId: string|null}>}
     */
    const { taskId, customerTaskId } = useMemo(() => {
        const URLquery = new URLSearchParams(location.search)
        return {
            taskId: URLquery.get("taskId"),
            customerTaskId: URLquery.get("customerTaskId"),
        }
    }, [location.search])

    /**
     * Асинхронно загружает данные задания и ответа пользователя.
     * Выполняет параллельную загрузку основных данных, затем при наличии variantId
     * загружает дополнительные данные о задании из варианта.
     * 
     * @async
     * @returns {Promise<void>}
     * @throws {Error} При отсутствии обязательных параметров или ошибке API
     */
    const loadTaskData = useCallback(async () => {
        // Проверка на наличие обязательных параметров
        if (!taskId || !customerTaskId) {
            setError("Отсутствуют необходимые параметры задания")
            setIsLoading(false)
            return
        }

        // Предотвращение повторной загрузки
        if (isLoadingRef.current) return
        isLoadingRef.current = true

        try {
            setIsLoading(true)
            setError(null)
            checkAuth()

            // Параллельная загрузка основных данных
            const [taskResponse, customerTaskResponse] = await Promise.all([
                getTaskByTaskId(taskId),
                getCustomerTaskByCustomerTaskId(customerTaskId),
            ])

            const task = taskResponse.data
            const customerTask = customerTaskResponse.data

            setTask(task)
            setCustomerTask(customerTask)

            // Загрузка дополнительных данных о задании, если есть variantId
            if (task?.variantId) {
                try {
                    const tasksResponse = await getTasksByVariantId(task.variantId)
                    const foundTask = tasksResponse.data?.find(t => t.taskType === task.taskType)
                    setCurrentTask(foundTask || null)
                } catch (variantError) {
                    console.warn("Не удалось загрузить данные варианта:", variantError)
                }
            }

        } catch (error) {
            console.error("Ошибка загрузки данных задания:", error)
            setError("Не удалось загрузить данные задания. Пожалуйста, попробуйте позже.")

        } finally {
            setIsLoading(false)
            isLoadingRef.current = false
        }
    }, [taskId, customerTaskId, checkAuth])

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        loadTaskData()
    }, [loadTaskData])

    /**
     * Генерирует полный URL для аудиофайла ответа пользователя
     * @type {string|null}
     */
    const audioUrl = useMemo(() => {
        return customerTask?.audioPath
            ? `${SERVER_API_URL}/${customerTask.audioPath.replace(/^\/+/, '')}`
            : null
    }, [customerTask])

    /**
     * Копирует текущий URL страницы в буфер обмена для возможности поделиться результатом
     * @async
     * @returns {Promise<void>}
     */
    const handleShareTask = useCallback(async () => {
        try {
            await navigator.clipboard.writeText(window.location.href)
            // TODO: Добавить уведомление об успешном копировании
        } catch (error) {
            console.error("Ошибка копирования URL:", error)
            // TODO: Добавить обработку ошибки для пользователя
        }
    }, [])

    /**
     * Инициирует скачивание аудиофайла ответа пользователя.
     * Создает временную ссылку для скачивания с именем файла в формате task-{id}-response.mp3
     * @returns {void}
     */
    const handleDownload = useCallback(() => {
        if (!customerTask?.audioPath) {
            console.warn("Аудиофайл не найден для скачивания")
            return
        }

        try {
            const cleanAudioPath = customerTask.audioPath.replace(/^\/+/, '')
            const audioUrl = `${SERVER_API_URL}/${cleanAudioPath}`
            const link = document.createElement('a')
            link.href = audioUrl
            link.download = `task-${taskId}-response.mp3`
            link.style.display = 'none'
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error) {
            console.error("Ошибка скачивания файла:", error)
        }
    }, [customerTask, taskId])

    /**
     * Отправляет задание на проверку преподавателю.
     * В текущей реализации функция-заглушка.
     * @returns {void}
     */
    const handleSubmitForReview = useCallback(() => {
        // TODO: Реализовать логику отправки на проверку
        console.log("Отправка задания на проверку")
    }, [])

    /**
     * Рендерит компонент деталей задания в зависимости от его типа.
     * Использует маппинг TASK_DETAIL_COMPONENTS для выбора соответствующего компонента.
     * 
     * @type {React.JSX.Element|null}
     */
    const renderTaskDetails = useMemo(() => {
        if (!currentTask?.taskType) return null

        const TaskComponent = TASK_DETAIL_COMPONENTS[currentTask.taskType]

        if (!TaskComponent) {
            console.warn(`Неизвестный тип задания: ${currentTask.taskType}`)
            return <div className="task-error">Неизвестный тип задания</div>
        }

        return <TaskComponent task={currentTask} />
    }, [currentTask])

    return (<>
        <Header />

        <div className="content_wrapper">
            <div className="task_result_container">
                <div className="task_result_bread_scrumbs">ЕГЭ / VARIANT / Ответы</div>

                <div className="task_result_btns_container">
                    <Btn btnText={"Отправить на проверку"} />

                    <div className="task_result_btns_sub_container">
                        <BtnLink btnText={"Ссылка"} btnFunc={handleShareTask} />
                        <BtnLink btnText={"Скачать"} btnFunc={handleDownload} />
                    </div>
                </div>

                {audioUrl && (
                    <div className="task_result_audio_player">
                        <audio controls src={audioUrl} preload="metadata">
                            Ваш браузер не поддерживает воспроизведение аудиофайла
                        </audio>
                    </div>
                )}

                <div className="task_result_accordion_container">
                    <Accordion summary={`Задание ${currentTask?.taskType}`} content={renderTaskDetails} isConnected={true} />
                </div>
            </div>
        </div>

        <Footer />
    </>)
}