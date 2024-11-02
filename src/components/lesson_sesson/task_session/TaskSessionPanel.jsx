import { useTimer } from "../../../hooks/useTimer"
import {secondsToMinutes} from "../../../modules/date/convertTime.js"
//По идее сюда можно добавить запись звука + сохранение blob audio
export const TaskSessionPanel = ({nextAction, btnText, sec}) => {
    const {time, resetTimer} = useTimer(sec, nextAction);
    return (
        <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <p>Progress bar</p>
            <p>{secondsToMinutes(time)}</p>
            <a onClick={()=> {nextAction()}} className="btn" style={{width:'auto',padding:'0px 15px'}} >{btnText}</a>
        </div>
    )
}