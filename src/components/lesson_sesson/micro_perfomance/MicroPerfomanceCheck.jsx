import useMediaRecorder from "../../../hooks/useMediaRecorder"

import { ReactComponent as MicOn } from "../../../res/icons/mic_24dp_gi.svg"
import { ReactComponent as MicOff } from "../../../res/icons/mic_off_24dp_gi.svg"

export const MicroPerfomanceCheck = ({setMicroCheck}) => {
    const {mediaBlobUrl, isRecording, startRecording, stopRecording, microphonePermission} = useMediaRecorder(false)

    return (<>
        <div className="microPerfomanceContent">
            <p>Чтобы убедиться, что Ваш микрофон работает правильно, выполните следующие шаги:
            <br/>1. Нажмите на зеленую кнопку ниже, чтобы предоставить разрешение на использование микрофона. Также убедитесь, что Вы разрешили доступ в настройках браузера.
            <br/>2. После получения разрешения начнется запись Вашего голоса, говорите в микрофон в течение нескольких секунд. Для завершения записи нажмите на зеленую кнопку.
            <br/>3. После завершения записи, вы может прослушать записанный звук. Убедитесь, что вы слышите свой голос!</p>
            
            <div className="microPerfomanceStatusIcon">
                {microphonePermission === "denied" ?  <>
                    <div className="microNotFound">
                        <a className="microIcon microOff">
                            <MicOff className="microIconSvg"/>
                        </a>
                        <p>Нет доступа к микрофону!</p>
                    </div></> :
                <><div className="microRecord">
                    {isRecording ? <>
                        <label className="microIcon microOn microAnim" for="record" onClick={() => stopRecording()}>
                            <MicOn className="microIconSvg"/>
                        </label>
                        <p>Идет запись голоса!</p></> : <>
                        <label className="microIcon microOn" for="record" onClick={() => startRecording()}>
                            <MicOn className="microIconSvg"/></label>
                        <p>Микрофон обнаружен!</p></>
                    } 
                    </div></>
                }
            </div>

            <div className="microActions">
                <audio controls src={mediaBlobUrl}><p>Ваш браузер не поддерживает audio тег</p></audio>
                <a className="btn defaultBtn" style={{width:'300px'}} onClick={()=> {setMicroCheck(true)}}>Приступить к решению</a>
            </div>
        </div>
    </>)
}