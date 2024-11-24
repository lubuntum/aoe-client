import SpeechRecognition, {useSpeechRecognition} from "react-speech-recognition"
export const useCustomSpeechRecognition = () => {
    const {
        finalTranscript, 
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition} = useSpeechRecognition();
    const startListening = async () => {
        await SpeechRecognition.startListening({continuous:true, language:"en-US"})
    }
    const stopListening = async () => {
        await SpeechRecognition.stopListening()
    }
    const reset = () => {
        resetTranscript()
    }

    return {startListening, stopListening, finalTranscript, 
        reset, listening, browserSupportsSpeechRecognition}
    
}