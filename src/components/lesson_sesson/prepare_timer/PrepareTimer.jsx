import "./css/prepare_timer.css"
import "./css/prepare_timer_media.css"

import { useState, useEffect, useRef } from "react"
import { useLessonSpeaker } from "../../../hooks/speech/useLessonSpeaker"
import { stages } from "../lesson_session_page/LessonSessionPage"
import { useTimer } from "../../../hooks/useTimer"
import { useAudioSpeaker } from "../../../hooks/sound/useAudioSpeaker"
import { speechUrls } from "../../../speechUrls"

export const PrepareTimer = ({sec, stage, setStage, task}) => {
    const stagesText = {
        [stages.prepare_reading]: "Get ready for the task!",
        [stages.prepare_speak] : "Get ready to the answer!"
    }
    const {speak} = useLessonSpeaker()
    const {speakAudio} = useAudioSpeaker()
    const speakStageText = () => {
        try {
            console.log("CURRENT TASK ", task.taskType)
            stage === stages.prepare_reading ?
            speakAudio(speechUrls[task.taskType], () => setStage(stages.reading)) :
            speakAudio(speechUrls["SPEAKING_START"], () => setStage(stages.speak))
        } catch(err) {
            console.error(`Error occurred while fetching urls ${err}`)
            stage === stages.prepare_reading ?
            speak(`Now we are ready to start, Task ${task.taskType}`, () => {setStage(stages.reading)}) :
            speak("Start speaking please",() => {setStage(stages.speak)})
        }
        
    }
    const {time, resetTimer} = useTimer(sec,speakStageText)
    const skipTimer = () => {
        stage === stages.prepare_reading ? setStage(stages.reading) : setStage(stages.speak)
    }
    return (<>
        <div className="prepareTimerContent">
            <div className="progressBarContainer" >
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progressBarBack" cx={"50%"} cy={"50%"} r={"45%"}/>
                </svg>
                <svg xmlns="http://www.w3.org/200/svg" version="1.1">
                    <circle className="progressBar" cx={"50%"} cy={"50%"} r={"45%"} 
                            strokeLinecap="round"
                            strokeDasharray={"300%"}/>
                </svg>
                <div className="progressBarShadow">
                    <div className="progressBarShadowBack"></div>
                </div>
                <p className="prepareTimer"><span>0{time}</span> sec.</p>
            </div>
            <p className="prepareWarning">{stagesText[stage]}</p>
        </div>  
    </>)
}