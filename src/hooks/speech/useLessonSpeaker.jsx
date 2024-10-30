export const useLessonSpeaker = (task, stage, setNextStage) => {
    
    const speak = (text, onEndCallback) => {
        const speechTemp = new SpeechSynthesisUtterance(text)
        speechTemp.lang = "en-US"

        speechTemp.onend = () => {
            onEndCallback()
        }

        window.speechSynthesis.speak(speechTemp);
    }
    return {speak}
}