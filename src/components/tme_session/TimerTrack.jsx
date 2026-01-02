import { STAGES } from "./SessionPage"
import { timerUtils } from "../../modules/timer_modules/sessionTimerConfig"
import { Btn } from "../tme_reusable/Btn"
import { useTimer } from "../../hooks/useTimer"

/**
 * Таймер для стадий чтения и говорения с кнопкой для перехода
 * @param {Object} props - Свойства компонента
 * @param {string} [props.key] - Уникальный ключ React для перерисовки
 * @param {boolean} [props.timerActive] - Флаг активности таймера
 * @param {Object} props.task - Данные текущего задания
 * @param {number} props.task.taskType - Тип задания (1-4)
 * @param {number} props.stage - Текущая стадия выполнения (STAGES.READING или STAGES.SPEAKING)
 * @param {function(): void} props.action - Функция, вызываемая при завершении таймера или нажатии кнопки
 * @returns {JSX.Element}
 */
export const TimerTrack = ({ key, timerActive = true, task, stage, action }) => {
    const taskId = task?.taskType || 1
    const assignmentConfig = timerUtils.getAssigmentConfig(taskId)

    const btnDisabled = (taskId === 3 && stage === STAGES.READING)
    const description = stage === STAGES.READING ? "Prepare" : "Record"
    const buttonText = stage === STAGES.READING ? "Skip" : "Next"
    const stageTimer = stage === STAGES.READING ? assignmentConfig.readingTime : assignmentConfig.speakingTime || 10

    const { time } = useTimer(stageTimer, action)
    const displayTime = timerActive ? timerUtils.formatTime(time) : timerUtils.formatTime(stageTimer)
    const dataDuration = timerActive ? stageTimer : 999999999

    return (
        <div key={key} className="track_container" data-duration={dataDuration}>
            <div className="track_content">
                <p>{description}</p>
                <div className="track_timer">{displayTime}</div>
                <Btn btnText={buttonText} btnFunc={action} btnDis={btnDisabled}/>
            </div>
        </div>
    )
}