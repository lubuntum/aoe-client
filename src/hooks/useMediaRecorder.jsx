import {useState, useRef, useEffect} from 'react'
const useMediaRecorder = (isOneChunck) => {
    //Object for working with micro (all stages)
    const mediaRecorderRef = useRef(null)
    //Raw data from micro output
    const audioChunksRef = useRef([])
    //Dynamic link for listening
    const [mediaBlobUrl, setMediaBlobUrl] = useState(null)
    const [isRecording, setIsRecording] = useState(false)

    const stopRecording = () => {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true})
        const recorder = new MediaRecorder(stream)
        recorder.ondataavailable = (event) => {
            audioChunksRef.current = [...audioChunksRef.current, event.data]
        };
        //console.log('add stop handler for recorder')
        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'})
            const audioUrl = URL.createObjectURL(audioBlob)
            setMediaBlobUrl(audioUrl)
            //Если не нужно сохранять прошлую запись, то обнуляем после создания ссылки
            if (isOneChunck) audioChunksRef.current = []
            //audioChunksRef.current = []
        };
        mediaRecorderRef.current = recorder;

        mediaRecorderRef.current.start();
        setIsRecording(true)
    }
    //side effect for clear dynamic link
    useEffect(() => {
        return () => {
            if (mediaBlobUrl)
                URL.revokeObjectURL(mediaBlobUrl)
        }
    }, [mediaBlobUrl]);
    return {mediaBlobUrl, isRecording, startRecording, stopRecording }
}
export default useMediaRecorder