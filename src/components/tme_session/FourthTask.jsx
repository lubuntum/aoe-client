import { useCallback, useEffect } from "react"
import { SERVER_API_URL } from "../../config"
import useLessonMediaRecorder from "../../hooks/useLessonMediaRecorder"
import { TimerTrack } from "./TimerTrack"
import { STAGES } from "./SessionPage"

/**
 * @typedef {Object} TaskContentTopicFour
 * @property {string} [taskGuide] - Руководство по выполнению задания
 * @property {string[]} [taskText] - Текст задания (массив строк)
 * @property {string[]} [subTasks] - Подзадачи/пункты задания
 * @property {string} [firstImg] - Путь к первому изображению
 * @property {string} [secondImg] - Путь ко второму изображению
 */

/**
 * @typedef {Object} Task
 * @property {number} taskType - Тип задания (1-4)
 * @property {string} id - Идентификатор задания
 * @property {TaskContentTopicFour} [taskContent] - Содержание задания
 */

/**
 * @typedef {Object} FourthTaskProps
 * @property {Task} task - Данные задания
 * @property {number} stage - Текущая стадия выполнения задания (из STAGES)
 * @property {function(stage: number): void} setStage - Функция установки стадии
 * @property {function(audioResult: {audio: Blob, taskId: string}): void} handleNextTask - Обработчик перехода к следующему заданию
 */

/**
 * Компонент 4 задания (Описание изображений с подзадачами)
 * @param {FourthTaskProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент 4 задания
 */
export const FourthTask = ({ task, stage, setStage, handleNextTask }) => {
    const { audioBlobRef, startRecording, stopRecording } = useLessonMediaRecorder(true)

    /**
     * Обработчик перехода с сохранением аудио
     * @returns {Promise<void>}
     */
    const handleNextTaskWithSave = useCallback(async () => {
        await stopRecording()

        handleNextTask({
            audio: audioBlobRef.current,
            taskId: task.id,
        })
    }, [stopRecording, handleNextTask, audioBlobRef, task.id])

    /**
     * Начало записи при стадии говорения
     * @returns {void}
     */
    useEffect(() => {
        if (stage === STAGES.SPEAKING)
            startRecording()
    }, [stage, startRecording])

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

                <div className="task_list">
                    <div className="task_text">
                        {task?.taskContent?.taskText[0] || "No text available"}
                    </div>

                    {task?.taskContent?.subTasks.map(item => (<div>- {item}</div>))}
                </div>

                <div className="task_img_container">
                    <div className="task_image">
                        <img src={`${SERVER_API_URL}/${task?.taskContent?.firstImg}`} alt="" />
                    </div>

                    <div className="task_image">
                        <img src={`${SERVER_API_URL}/${task?.taskContent?.secondImg}`} alt="" />
                    </div>
                </div>
            </div>

            {stage === STAGES.READING &&
                <TimerTrack task={task} stage={stage} action={() => { setStage(STAGES.PREPARE_SPEAKING) }} />}

            {stage === STAGES.SPEAKING &&
                <TimerTrack task={task} stage={stage} action={() => { handleNextTaskWithSave() }} />}
        </div>
    </>)
}