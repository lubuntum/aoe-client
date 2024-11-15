import "./css/task_bottom_panel.css"

import { ReactComponent as Record } from "../../../res/icons/screen_record_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { stages } from "../lesson_session_page/LessonSessionPage.jsx";
import { useTimer } from "../../../hooks/useTimer.jsx"
import {secondsToMinutes} from "../../../modules/date/convertTime.js"
import { useEffect, useRef, useState } from "react";

//По идее сюда можно добавить запись звука + сохранение blob audio
export const TaskSessionPanel = ({nextAction, btnText, sec, stage}) => {
    const {time, resetTimer} = useTimer(sec, nextAction);
    let description = stage === stages.reading ? "Time to prepare" : "Record"
    let record = stage === stages.reading ? "none" : "flex"
    /* Гладкое обновление, не работает time при нем...
    useEffect(()=>{
        //if (sec === 0) return
        const interval = setInterval(()=>{
            setProgress(prev => prev - ((100 - ((sec-1)/sec)*100) / 10))
            //setProgress(time/sec)
        }, 100)
        return () => clearInterval(interval)
    }, [])
    */
    let currentProgress = 0
    if(sec !== 0 && sec !== null)
        currentProgress = (time / sec).toFixed(3) * 100
    return (<>
        <div className="sessionBottomPanel">
            <p className="panelDescription">{description}</p>
            <div className="panelRecordIcon" style={{display: record}}><Record className="panelRecordIconSvg"/></div>
            <div className="panelProgressBarBackground">
                <div className="panelProgressBarLine" style={{width: `${currentProgress}%`}}></div>
            </div>
            <p className="panelTimer">{secondsToMinutes(time)}</p>
            <a onClick={()=> {nextAction()}} className="btn">{btnText}</a>
        </div>
    </>)
}