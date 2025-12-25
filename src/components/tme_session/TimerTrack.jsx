import { STAGES } from "./SessionPage"
import { timerUtils } from "../../modules/timer_modules/sessionTimerConfig"
import { Btn } from "../tme_reusable/Btn"
import { useTimer } from "../../hooks/useTimer"

/**
 * @typedef {Object} TimerTrackProps
 * @property {string} [key] - Уникальный ключ React для перерисовки компонента
 * @property {boolean} [timerActive] - Флаг активности таймера (по умолчанию true)
 * @property {Object} task - Данные текущего задания
 * @property {number} task.taskType - Тип задания (1-4)
 * @property {number} stage - Текущая стадия выполнения (STAGES.READING или STAGES.SPEAKING)
 * @property {function(): void} action - Функция-действие, вызываемая при завершении таймера или нажатии на кнопку
 */

/**
 * @typedef {Object} AssignmentConfig
 * @property {number} readingTime - Время на чтение в секундах
 * @property {number} speakingTime - Время на говорение в секундах
 */

/**
 * Простой таймер только для стадий чтения и говорения
 * @param {TimerTrackProps} props - Свойства компонента
 * @returns {JSX.Element} Компонент трекера таймера
 */
export const TimerTrack = ({ key, timerActive = true, task, stage, action }) => {
    const taskId = task?.taskType || 1
    
    /** @type {AssignmentConfig} */
    const assignmentConfig = timerUtils.getAssigmentConfig(taskId)

    // Получаем активность кнопки (только для 3 задания стадии чтения)
    const btnDisabled = (taskId === 3 && stage === STAGES.READING) ? true : false

    // Получаем название для стадии
    const description = stage === STAGES.READING ? "Prepare" : "Record" || "Time left"

    // Получаем название для кнопки
    const buttonText = stage === STAGES.READING ? "Skip" : "Next"

    // Получаем время для таймера в зависимости от стадии
    const stageTimer = stage === STAGES.READING ? assignmentConfig.readingTime : assignmentConfig.speakingTime || 10

    // Получаем таймер
    const { time } = useTimer(stageTimer, action)

    // Форматируем время
    const displayTime = timerActive ? timerUtils.formatTime(time) : timerUtils.formatTime(stageTimer)

    // Костыль для анимации чтобы не было видно движения прогресс бара пока таймер не активен
    const dataDuration = timerActive ? stageTimer : 999999999

    return (<>
        <div key={key} className="track_container" data-duration={dataDuration}>
            <div className="track_content">
                <p>{description}</p>
                
                <div className="track_timer">{displayTime}</div>

                <Btn btnText={buttonText} btnFunc={action} btnDis={btnDisabled}/>
            </div>
        </div>
    </>)
}