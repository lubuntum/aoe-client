import { ReactComponent as DashI } from "../../res/icons/dash_24dp_gi.svg"
import { ReactComponent as TimerI } from "../../res/icons/timer_24dp_gi.svg"
import { ReactComponent as DoneI } from "../../res/icons/all_done_24dp_gi.svg"
import { ReactComponent as WarnI } from "../../res/icons/warn_24dp_gi.svg"
import { ReactComponent as ErrorI } from "../../res/icons/error_24dp_gi.svg"
import { ReactComponent as CalendarI } from "../../res/icons/calendar_24dp_gi.svg"
import { ReactComponent as TrashI } from "../../res/icons/aut_delete_24dp_gi.svg"
import { ReactComponent as LinkI } from "../../res/icons/link_24dp_gi.svg"
import { ReactComponent as DownloadI } from "../../res/icons/download_24dp_gi.svg"
import { ReactComponent as ExpandI } from "../../res/icons/expand_24dp_gi.svg"
import { useState } from "react"
import { BtnIcon } from "../tme_reusable/BtnIcon"
import { Btn } from "../tme_reusable/Btn"

// Статусы для ответов пользователей
export const STATUS_TYPES = {
    IDLE: 'idle',
    CHECKING: 'checking',
    DONE: 'done',
    WARNING: 'warning',
    ERROR: 'error'
}

// Дефолтные подсказки для статусов
const DEFAULT_TOOLTIPS = {
    [STATUS_TYPES.IDLE]: "Ожидание отправки на проверку",
    [STATUS_TYPES.CHECKING]: "Идет проверка вашего ответа...",
    [STATUS_TYPES.DONE]: "Проверка ответа завершена",
    [STATUS_TYPES.WARNING]: "Есть предупреждение",
    [STATUS_TYPES.ERROR]: "Произошла ошибка"
}

export const VariantAnswer = ({status = STATUS_TYPES.IDLE, tooltipText = {}}) => {

    // Работа со статусами ответов
    const [showTooltip, setShowTooltip] = useState(false)
    const answerStatuses = {
        [STATUS_TYPES.IDLE]: <DashI className="svg_icon"/>,
        [STATUS_TYPES.CHECKING]: <TimerI className="svg_icon"/>,
        [STATUS_TYPES.DONE]: <DoneI className="svg_icon"/>,
        [STATUS_TYPES.WARNING]: <WarnI className="svg_icon"/>,
        [STATUS_TYPES.ERROR]: <ErrorI className="svg_icon"/>,
    }
    const allTooltips = {
        ...DEFAULT_TOOLTIPS, ...tooltipText
    }
    const getTooltipText = () => {
        return allTooltips[status] || DEFAULT_TOOLTIPS[status]
    }
    const handleMouseEnter = () => {
        setShowTooltip(true)
    }
    const handleMouseLeave = () => {
        setShowTooltip(false)
    }
    const handleTouchStart = () => {
        setShowTooltip(true)
        setTimeout(() => {
            setShowTooltip(false)
        }, 5000)
    }

    return (<>
        <div className="answer_container">
            <div className={`answer_status answer_status--${status}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onTouchStart={handleTouchStart}>
                {answerStatuses[status] || answerStatuses[STATUS_TYPES.IDLE]}

                {showTooltip && <div className={`answer_tooltip answer_tooltip--${status}`}>{getTooltipText()}</div>}
            </div>

            <div className="answer_variant_name">
                <p>Living in the countryside</p>
            </div>

            <div className="answer_tags">
                <p>экзамен</p>

                <div>
                    <CalendarI className="svg_icon"/>
                    <p>30.09.2025</p>
                </div>
            </div>

            <div  className="answer_options">
                <BtnIcon btnIcon={<LinkI className="svg_icon"/>}/>
                <BtnIcon btnIcon={<DownloadI className="svg_icon"/>}/>
            </div>

            <div className="answer_results">
                {status === STATUS_TYPES.DONE ? 
                    <div className="answer_button_container done"><Btn btnText={"Результаты"}/></div> :
                    <div className="answer_button_container"><Btn btnText={"AI Проверка"}/></div>}
            </div>
        </div>
    </>)
}