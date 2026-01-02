import { useCallback, useEffect } from "react"
import { SERVER_API_URL } from "../../config"
import useLessonMediaRecorder from "../../hooks/useLessonMediaRecorder"
import { TimerTrack } from "./TimerTrack"
import { STAGES } from "./SessionPage"

/**
 * Компонент четвертого задания (описание изображений с подзадачами)
 * @param {Object} props - Свойства компонента
 * @param {Object} props.task - Данные задания
 * @param {Object} props.task.taskContent - Содержание задания
 * @param {string} props.task.taskContent.taskGuide - Руководство по выполнению
 * @param {string[]} props.task.taskContent.taskText - Текст задания
 * @param {string[]} props.task.taskContent.subTasks - Подзадачи/пункты задания
 * @param {string} props.task.taskContent.firstImg - Путь к первому изображению
 * @param {string} props.task.taskContent.secondImg - Путь ко второму изображению
 * @param {string} props.task.id - Идентификатор задания
 * @param {number} props.stage - Текущая стадия выполнения
 * @param {function(number): void} props.setStage - Функция установки стадии
 * @param {function({audio: Blob, taskId: string}): void} props.handleNextTask - Обработчик перехода к следующему заданию
 * @returns {JSX.Element}
 */
export const FourthTask = ({ task, stage, setStage, handleNextTask }) => {
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
                    ({task?.taskContent?.taskText[1] || "No description available"})
                </div>

                <div className="task_divider"></div>

                <div className="task_list">
                    <div className="task_text">
                        {task?.taskContent?.taskText[0] || "No text available"}
                    </div>

                    {task?.taskContent?.subTasks?.map((item, index) => (
                        <div key={index}>- {item}</div>
                    ))}
                </div>

                <div className="task_img_container">
                    <div className="task_image">
                        <img 
                            src={`${SERVER_API_URL}/${task?.taskContent?.firstImg}`} 
                            alt={task?.taskContent?.taskText[0] || "First task image"}
                        />
                    </div>

                    <div className="task_image">
                        <img 
                            src={`${SERVER_API_URL}/${task?.taskContent?.secondImg}`} 
                            alt={task?.taskContent?.taskText[0] || "Second task image"}
                        />
                    </div>
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