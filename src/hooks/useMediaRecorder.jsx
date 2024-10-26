import {useState, useRef, useEffect} from 'react'
import { concatenateAudioBlobs } from '../modules/audio/audioBlobs'
const useMediaRecorder = (isOneChunck) => {
    //Object for working with micro (all stages)
    const mediaRecorderRef = useRef(null)
    //audio/wav file
    const audioBlobRef = useRef(null)
    //Raw data from micro output
    const audioChunksRef = useRef([])
    //Dynamic link for listening
    const [mediaBlobUrl, setMediaBlobUrl] = useState(null)
    const [isRecording, setIsRecording] = useState(false)
    const reset = () => {
        mediaRecorderRef.current = null
        audioBlobRef.current = null
        audioChunksRef.current = []
        setMediaBlobUrl(null)
        setIsRecording(false)
    }
    const stopRecording = () => {
        if (mediaRecorderRef.current != null) mediaRecorderRef.current.stop();
        setIsRecording(false);
    }
    const startRecording = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true})
        const recorder = new MediaRecorder(stream)
        recorder.ondataavailable = (event) => {
            audioChunksRef.current.push(event.data)
            console.log(audioChunksRef.current)
        };
        //console.log('add stop handler for recorder')
        recorder.onstop = async () => {
            isOneChunck 
                ? audioBlobRef.current = new Blob(audioChunksRef.current, {type: 'audio/wav'}) 
                : audioBlobRef.current = await concatenateAudioBlobs(audioChunksRef.current)
            //const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/wav'})
            //const audioBlob = await concatenateAudioBlobs(audioChunksRef.current)
            console.log(audioBlobRef.current)
            const audioUrl = URL.createObjectURL(audioBlobRef.current)
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
    return {audioBlobRef, mediaBlobUrl, isRecording, startRecording, stopRecording, reset }
}


export default useMediaRecorder