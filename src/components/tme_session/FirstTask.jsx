import { useCallback, useEffect } from "react"
import useLessonMediaRecorder from "../../hooks/useLessonMediaRecorder"
import { TimerTrack } from "./TimerTrack"
import { STAGES } from "./SessionPage"

/**
 * @typedef {Object} TaskContent
 * @property {string} [taskGuide] - Руководство по выполнению задания
 * @property {string} [taskText] - Текст для чтения
 */

/**
 * @typedef {Object} Task
 * @property {number} taskType - Тип задания (1-4)
 * @property {string} id - Идентификатор задания
 * @property {TaskContent} [taskContent] - Содержание задания
 */

/**
 * @typedef {Object} FirstTaskProps
 * @property {Task} task - Данные задания
 * @property {number} stage - Текущая стадия выполнения задания (из STAGES)
 * @property {function(stage: number): void} setStage - Функция установки стадии
 * @property {function(audioResult: {audio: Blob, taskId: string}): void} handleNextTask - Обработчик перехода к следующему заданию 
 */

/**
 * Компонент 1 задания (Прочитать текст)
 * @param {FirstTaskProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент 1 задания
 */
export const FirstTask = ({ task, stage, setStage, handleNextTask }) => {
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
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>

                <div className="task_divider"></div>

                <div className="task_text">
                    {task?.taskContent?.taskText || "No text available"}
                </div>
            </div>

            {stage === STAGES.READING &&
                <TimerTrack task={task} stage={stage} action={ () => {setStage(STAGES.PREPARE_SPEAKING)} }/>}
                
            {stage === STAGES.SPEAKING &&
                <TimerTrack task={task} stage={stage} action={ () => {handleNextTaskWithSave()} }/>}
        </div>
    </>)
}