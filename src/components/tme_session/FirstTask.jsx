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
 * Компонент первого задания (чтение текста)
 * @param {Object} props - Свойства компонента
 * @param {Task} props.task - Данные задания
 * @param {number} props.stage - Текущая стадия выполнения
 * @param {function(number): void} props.setStage - Функция установки стадии
 * @param {function({audio: Blob, taskId: string}): void} props.handleNextTask - Обработчик перехода к следующему заданию
 * @returns {JSX.Element}
 */
export const FirstTask = ({ task, stage, setStage, handleNextTask }) => {
    const { audioBlobRef, startRecording, stopRecording } = useLessonMediaRecorder(true)

    const handleNextTaskWithSave = useCallback(async () => {
        await stopRecording()
        handleNextTask({
            audio: audioBlobRef.current,
            taskId: task.id,
        })
    }, [stopRecording, handleNextTask, audioBlobRef, task.id])

    useEffect(() => {
        if (stage === STAGES.SPEAKING) startRecording()
    }, [stage, startRecording])

    return (
        <div className="task_container">
            <div className="task_content">
                <div className="task_guide">
                    <span>GUIDE:</span> {task?.taskContent?.taskGuide || "No guide available"}
                </div>
                <div className="task_divider"></div>
                <div className="task_text">
                    {task?.taskContent?.taskText || "No text available"}
                </div>
            </div>

            {stage === STAGES.READING &&
                <TimerTrack 
                    task={task} 
                    stage={stage} 
                    action={() => setStage(STAGES.PREPARE_SPEAKING)} 
                />
            }
                
            {stage === STAGES.SPEAKING &&
                <TimerTrack 
                    task={task} 
                    stage={stage} 
                    action={handleNextTaskWithSave} 
                />
            }
        </div>
    )
}