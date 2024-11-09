import "./css/task_bottom_panel.css"

import { ReactComponent as Record } from "../../../res/icons/screen_record_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { stages } from "../lesson_session_page/LessonSessionPage.jsx";
import { useTimer } from "../../../hooks/useTimer.jsx"
import {secondsToMinutes} from "../../../modules/date/convertTime.js"

//По идее сюда можно добавить запись звука + сохранение blob audio
export const TaskSessionPanel = ({nextAction, btnText, sec, stage}) => {
    const {time, resetTimer} = useTimer(sec, nextAction);
    
    let description = stage === stages.reading ? "Time to prepare" : "Record"
    let record = stage === stages.reading ? "none" : "flex"

    return (<>
        <div className="sessionBottomPanel">
            <p className="panelDescription">{description}</p>
            <div className="panelRecordIcon" style={{display: record}}><Record className="panelRecordIconSvg"/></div>
            <div className="panelProgressBarBackground">
                <div className="panelProgressBarLine" style={{width: "80%"}}></div> {/*TODO Здесь надо менять ширину прогресс бара в зависимости от таймера*/}
            </div>
            <p className="panelTimer">{secondsToMinutes(time)}</p>
            <a onClick={()=> {nextAction()}} className="btn">{btnText}</a>
        </div>
    </>)
}