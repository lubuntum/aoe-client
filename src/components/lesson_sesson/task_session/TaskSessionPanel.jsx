import { useTimer } from "../../../hooks/useTimer"
import {secondsToMinutes} from "../../../modules/date/convertTime.js"

import { ReactComponent as Record } from "../../../res/icons/screen_record_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
//По идее сюда можно добавить запись звука + сохранение blob audio
export const TaskSessionPanel = ({nextAction, btnText, sec}) => {
    const {time, resetTimer} = useTimer(sec, nextAction);
    return (<>
        <div className="sessionBottomPanel">
            <p className="panelDescription">Time to prepare</p> {/*Здесь надо заменять текст в зависимости от stage "Reading - Time to prepare, Speaking - Record"*/}
            <div className="panelRecordIcon" style={{display: "none"}}><Record className="panelRecordIconSvg"/></div> {/*Должно появлятся только когда stage speaking*/}
            <div className="panelProgressBarBackground">
                <div className="panelProgressBarLine" style={{width: "80%"}}></div> {/*Здесь надо менять ширину прогресс бара в зависимости от таймера*/}
            </div>
            <p className="panelTimer">{secondsToMinutes(time)}</p>
            <a onClick={()=> {nextAction()}} className="btn">{btnText}</a>
        </div>
    </>)
}