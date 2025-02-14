
export const useLessonSpeaker = () => {
    const findEnglishVoice = () => {
        const synth = window.speechSynthesis
        const voices = synth.getVoices()
        return voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
    }
    const speak = (text, onEndCallback) => {
        if (window.responsiveVoice) {
            window.responsiveVoice.speak(text, "UK English Female", {
                onend: onEndCallback // Corrected from oneng to onend
            })
            return
        }
        const speechTemp = new SpeechSynthesisUtterance(text)
        speechTemp.lang = "en-US"
        const englishVoice = findEnglishVoice()
        if (englishVoice) speechTemp.voice = englishVoice

        speechTemp.onend = () => {
            onEndCallback()
        }

        window.speechSynthesis.speak(speechTemp);
    }
    return {speak}
}