import useMediaRecorder from "../../../hooks/useMediaRecorder"

import { ReactComponent as MicOn } from "../../../res/icons/mic_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as MicOff } from "../../../res/icons/mic_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const MicroPerfomanceCheck = () => {
    const {mediaBlobUrl, isRecording, startRecording, stopRecording} = useMediaRecorder(false)

    return (<>
        <div className="microPerfomanceContent">
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui, doloremque. Dicta quas at, nobis culpa quo dignissimos impedit repellendus debitis ea nulla aut, hic repudiandae quisquam rerum iure fugit illum? Illum cupiditate accusamus, nulla ipsa rem ullam dignissimos qui voluptas.</p>
            <div className="microPerfomanceStatusIcon">
                <div className="microNotFound">
                    <a className="microIcon microOff" onClick={{}}>
                        <MicOff className="microIconSvg"/>
                    </a>
                    <p>Микрофон не найден!</p>
                </div>

                <div className="microRecord">
                    <input type="checkbox" id="record"/>
                    {isRecording ? <>
                        <label className="microIcon microOn" for="record" onClick={() => stopRecording()}>
                            <MicOn className="microIconSvg"/>
                        </label>
                        <p>Идет запись голоса!</p></> 
                    : <>
                        <label className="microIcon microOn" for="record" onClick={() => startRecording()}>
                            <MicOn className="microIconSvg"/></label>
                        <p>Микрофон обнаружен!</p></>
                    } 
                </div>
            </div>
            <audio controls src={mediaBlobUrl}><p>Ваш браузер не поддерживает audio тег</p></audio>
        </div>
    </>)
}