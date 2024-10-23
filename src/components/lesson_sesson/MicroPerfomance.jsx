import useMediaRecorder from "../../hooks/useMediaRecorder"

export const MicroPerfomance = () => {
    const {mediaBlobUrl, isRecording, startRecording, stopRecording} = useMediaRecorder(true)
    return (
        <>
            <div className="checkMicroContainer">
                <p>Micro perfomance check before the exam</p>
                {isRecording ? <a className="btn" style={{width:'auto',padding:'0px 15px', background:'red'}} onClick={() => stopRecording()} >Стоп</a>
                    : <a className="btn" style={{width:'auto',padding:'0px 15px'}} onClick={() => startRecording()} >Проверить</a>
                }
                {mediaBlobUrl &&
                    <audio controls src={mediaBlobUrl} >
                        Ваш браузер не поддерживает audio тег
                    </audio>}
            </div>
        </>
    )
}