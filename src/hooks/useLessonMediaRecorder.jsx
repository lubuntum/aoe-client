import { useRef, useState } from "react"
import { concatenateAudioBlobs } from "../modules/audio_modules/audioBlobs"

const useLessonMediaRecorder = (isOneChunck, callback = null) => {
//Object for working with micro (all stages)
    const mediaRecorderRef = useRef(null)
    //audio/wav file
    const audioBlobRef = useRef(null)
    //Raw data from micro output
    const audioChunksRef = useRef([])
    const stopRecording =  () => {
        return new Promise((resolve) => {
            if (mediaRecorderRef.current != null) {
                mediaRecorderRef.current.onstop = async () => {
                    isOneChunck 
                        ? audioBlobRef.current = new Blob(audioChunksRef.current, {type: 'audio/wav'}) 
                        : audioBlobRef.current = await concatenateAudioBlobs(audioChunksRef.current);
                    console.log("Recording stopped, audioBlobRef.current:", audioBlobRef.current);
                    if (isOneChunck) audioChunksRef.current = [];
                    resolve();
                };
                mediaRecorderRef.current.stop();
            } else {
                resolve();
            }
        });
    }
    const startRecording = async () => {
        try{
            const stream = await navigator.mediaDevices.getUserMedia({audio:true})
            const recorder = new MediaRecorder(stream)
            recorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data)
                console.log(audioChunksRef.current)
            };
            //console.log('add stop handler for recorder')
            mediaRecorderRef.current = recorder;

            mediaRecorderRef.current.start();

        } catch(err) {
            console.log(err)
        }
    }
    return {audioBlobRef,startRecording, stopRecording}
}

export default useLessonMediaRecorder