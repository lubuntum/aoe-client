
export const useLessonSpeaker = () => {
    const findEnglishVoice = () => {
        const synth = window.speechSynthesis
        const voices = synth.getVoices()
        return voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
    }
    const speak = (text, onEndCallback) => {
        try {
            if (window.responsiveVoice) {
                window.responsiveVoice.speak(text, "UK English Female", {
                    onend: onEndCallback // Corrected from oneng to onend
                })
            }
        } catch(err) {
            if (err !== undefined) console.error(err)
            speakDefault(text, onEndCallback)
        }
    }
    const speakDefault = (text, onEndCallback) => {
        try {
            const speechTemp = new SpeechSynthesisUtterance(text)
            speechTemp.lang = "en-US"
            const englishVoice = findEnglishVoice()
            if (englishVoice) speechTemp.voice = englishVoice
                speechTemp.onend = () => {
                    onEndCallback()
            }
            window.speechSynthesis.speak(speechTemp);
        } catch (err) {
            if (err !== undefined) console.error(err)
            onEndCallback()
        }
    }
    return {speak}
}