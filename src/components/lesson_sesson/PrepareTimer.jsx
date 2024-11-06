import { useState, useEffect, useRef } from "react"
import { useLessonSpeaker } from "../../hooks/speech/useLessonSpeaker"
import {stages} from "./LessonSessionPage"
import { useTimer } from "../../hooks/useTimer"

export const PrepareTimer = ({sec, stage, setStage, task}) => {
    //const [time, setTime] = useState(sec)
    const {speak} = useLessonSpeaker()
    const currentProgress = useRef(0)
    const shadowProgress = useRef(100)
    const speakStageText = () => {
        stage === stages.prepare_reading ?
        speak(`Now we are ready to start, Task ${task.taskType}`, () => {setStage(stages.reading)}) :
        speak("Start speaking please",() => {setStage(stages.speak)})
    }
    const {time, resetTimer} = useTimer(sec,speakStageText)
    //Первое присваивание пропускаем, что бы уложиться в круг таймера
    if (time !== sec) {
        currentProgress.current += 300 / sec
        shadowProgress.current -= (100 / sec)
    }
    
    return (<>
        <div className="prepareTimerContent">
            <div className="progressBarContainer">
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progressBarBack" cx={"50%"} cy={"50%"} r={"45%"}/>
                </svg>
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progressBar" cx={"50%"} cy={"50%"} r={"45%"} 
                            strokeLinecap="round"
                            strokeDasharray={"300%"}
                            strokeDashoffset={`${currentProgress.current}%`}/> //Тут надо менять проценты для убавления прогресс бара "0 секунд - 300%, 5 секунд - 0%"
                </svg>
                <div className="progressBarShadow" style={{background: `conic-gradient(#2276f4 ${shadowProgress.current}%, transparent 0)`}}> // тут надо менять проценты для убавления тени у прогресс бара "от 0 до 100%"
                    <div className="progressBarShadowBack"></div>
                </div>
                <p className="prepareTimer"><span>0{time}</span> sec.</p>
            </div>
            <p className="prepareWarning">Get ready for the task!</p>
        </div>  
    </>)
}