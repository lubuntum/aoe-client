import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { Footer } from "../tme_footer/Footer"
import { Header } from "../tme_header/Header"
import { Accordion } from "../tme_reusable/Accordion"
import { Btn } from "../tme_reusable/Btn"
import { BtnLink } from "../tme_reusable/BtnLink"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { getTaskByTaskId } from "../../modules/api_modules/taskAPI"
import { getTasksByVariantId } from "../../modules/api_modules/variantAPI"
import { getCustomerTaskByExamId } from "../../modules/api_modules/resultAPI"
import { FirstTaskDetails } from "./FirstTaskDetails"
import { SecondTaskDetails } from "./SecondTaskDetails"
import { ThirdTaskDetails } from "./ThirdTaskDetails"
import { FourthTaskDetails } from "./FourthTaskDetails"
import { SERVER_API_URL } from "../../config"

/**
 * Объект для сопоставления типов заданий с соответствующими компонентами отображения деталей
 * @type {Object<number, React.ComponentType<{task: Object}>>}
 */
const TASK_DETAIL_COMPONENTS = {
    1: FirstTaskDetails,
    2: SecondTaskDetails,
    3: ThirdTaskDetails,
    4: FourthTaskDetails,
}

/**
 * Компонент страницы результатов экзамена
 * Отображает детализированные результаты выполнения заданий экзамена с возможностью
 * просмотра ответов пользователя, аудиозаписей и отправки на повторную проверку
 * 
 * @component
 * @returns {JSX.Element} Компонент страницы результатов экзамена
 */
export const ExamResultPage = () => {
    /** @type {Object} Данные аутентификации пользователя */
    const { isAuth, checkAuth } = useAuth()
    /** @type {Function} Функция для навигации между страницами */
    const navigate = useNavigate()
    /** @type {Object} Объект location текущего маршрута */
    const location = useLocation()
    /** @type {React.MutableRefObject<boolean>} Ref для отслеживания состояния загрузки */
    const isLoadingRef = useRef(false)

    /** @type {[Array<Object>|null, Function]} Состояние списка заданий варианта */
    const [tasks, setTasks] = useState(null)
    /** @type {[Array<Object>|null, Function]} Состояние выполненных пользователем заданий */
    const [customerTasks, setCustomerTasks] = useState(null)
    /** @type {[Array<Object>, Function]} Состояние объединенных результатов */
    const [mergedResults, setMergedResults] = useState([])
    /** @type {[boolean, Function]} Состояние загрузки данных */
    const [isLoading, setIsLoading] = useState(true)
    /** @type {[string|null, Function]} Состояние ошибки при загрузке данных */
    const [error, setError] = useState(null)

    /**
     * Извлекает параметры examId и variantId из query-строки URL
     * @type {Object}
     * @property {string|null} examId - ID экзамена пользователя
     * @property {string|null} variantId - ID варианта экзамена
     */
    const { examId, variantId } = useMemo(() => {
        const URLquery = new URLSearchParams(location.search)
        return {
            examId: URLquery.get("examId"),
            variantId: URLquery.get("variantId"),
        }
    }, [location.search])

    /**
     * Объединяет данные заданий с ответами пользователя
     * @callback
     * @param {Array<Object>} tasks - Массив заданий варианта
     * @param {Array<Object>} customerTasks - Массив выполненных пользователем заданий
     * @returns {Array<Object>} Отсортированный массив объединенных результатов
     */
    const mergeTaskData = useCallback((tasks, customerTasks) => {
        if (!tasks || !customerTasks)
            return []

        const merged = tasks.map((task) => {
            const customerTask = customerTasks.find(cT => cT.taskId === task.id)
            return { task, customerTask }
        }).filter(item => item.customerTask)

        return merged.sort((a, b) => a.task.taskType - b.task.taskType)
    }, [])

    /**
     * Загружает данные экзамена и результаты выполнения заданий
     * @callback
     * @async
     * @returns {Promise<void>}
     * @throws {Error} При отсутствии параметров или ошибке загрузки
     */
    const loadExamData = useCallback(async () => {
        if (!examId || !variantId) {
            setError("Отсутствуют необходимые параметры экзамена")
            setIsLoading(false)
            return
        }

        if (isLoadingRef.current) return
        isLoadingRef.current = true

        try {
            setIsLoading(true)
            setError(null)
            checkAuth()

            const [tasksResponse, customerTasksResponse] = await Promise.all([
                getTasksByVariantId(variantId),
                getCustomerTaskByExamId(examId),
            ])

            const tasksData = tasksResponse.data
            const customerTasksData = customerTasksResponse.data

            setTasks(tasksData)
            setCustomerTasks(customerTasksData)
            setMergedResults(mergeTaskData(tasksData, customerTasksData))

        } catch (error) {
            console.error("Ошибка загрузки данных экзамена:", error)
            setError("Не удалось загрузить данные экзамена. Пожалуйста, попробуйте позже.")

        } finally {
            setIsLoading(false)
            isLoadingRef.current = false
        }
    }, [examId, variantId, checkAuth, mergeTaskData])

    /**
     * Загружает данные экзамена при монтировании компонента
     */
    useEffect(() => {
        loadExamData()
        console.log(mergedResults)
    }, [loadExamData])

    /**
     * Формирует полный URL для аудиофайлов
     * @callback
     * @param {string} audiiPath - Относительный путь к аудиофайлу
     * @returns {string|null} Полный URL аудиофайла или null при отсутствии пути
     */
    const audioUrl = useCallback((audiiPath) => {
        return audiiPath ? `${SERVER_API_URL}/${audiiPath.replace(/^\/+/, '')}` : null
    }, [])

    /**
     * Копирует URL текущей страницы в буфер обмена
     * @callback
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
     * Обрабатывает отправку задания на повторную проверку
     * @callback
     */
    const handleSubmitForReview = useCallback(() => {
        // TODO: Реализовать логику отправки на проверку
        console.log("Отправка задания на проверку")
    }, [])

    /**
     * Рендерит компонент с деталями задания в зависимости от типа задания
     * @callback
     * @param {Object} task - Объект задания
     * @returns {JSX.Element|null} Компонент с деталями задания или null
     */
    const renderTaskDetails = useCallback((task) => {
        if (!task?.taskType) return null

        const TaskComponent = TASK_DETAIL_COMPONENTS[task.taskType]

        if (!TaskComponent) {
            console.warn(`Неизвестный тип задания: ${task.taskType}`)
            return <div className="task-error">Неизвестный тип задания</div>
        }

        return <TaskComponent task={task} />
    }, [])

    return (<>
        <Header />

        <div className="content_wrapper">
            <div className="task_result_container">
                <div className="task_result_bread_scrumbs">ЕГЭ / VARIANT / Ответы</div>

                <div className="task_result_btns_container">
                    <Btn btnText={"Отправить на проверку"} />

                    <div className="task_result_btns_sub_container">
                        <BtnLink btnText={"Ссылка"} btnFunc={handleShareTask} />
                        <BtnLink btnText={"Скачать"} />
                    </div>
                </div>

                <div className="task_result_exam_container">
                    {mergedResults.map((item, index) => {
                        const { task, customerTask } = item
                        const audioSrc = customerTask?.audioPath ? audioUrl(customerTask.audioPath) : null

                        return (<>
                            {audioSrc && (
                                <div className="task_result_audio_player">
                                    <audio controls src={audioSrc} preload="metadata">
                                        Ваш браузер не поддерживает воспроизведение аудиофайла
                                    </audio>
                                </div>
                            )}

                            <div className="task_result_accordion_container">
                                <Accordion summary={`Задание ${task?.taskType}`} content={renderTaskDetails(task)} isConnected={true}
                                />
                            </div>
                        </>)
                    })}
                </div>
            </div>
        </div>

        <Footer />
    </>)
}