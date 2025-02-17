
export const useLessonSpeaker = () => {
    let isSpoken = false
    const findEnglishVoice = () => {
        const synth = window.speechSynthesis
        const voices = synth.getVoices()
        return voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
    }
    const speak = (text, onEndCallback) => {
        try {
            if (window.responsiveVoice) {
                window.responsiveVoice.speak(text, "UK English Female", {
                    onend: () => {isSpoken = true; onEndCallback() }, // Corrected from oneng to onend
                    onerror: (error) => {
                        console.error("Error in response voice", error)
                        speakDefault(text, onEndCallback)
                    }
                })
            setTimeout(()=>{
                if (window.speechSynthesis.speaking) {
                    console.log("speaking...")
                }
                else if (!isSpoken) {
                    console.warn("Speech did not start, falling back to default voice")
                    speakDefault(text, onEndCallback)
                }
                else {
                    console.log("is spoken: ", isSpoken)
                }
            }, 5000)
            } else {
                console.error("Cant connect to responsive voice")
                speakDefault(text, onEndCallback)
            }
        } catch(err) {
            if (err !== undefined) console.error(err)
            console.log("Some error occurred while using responsive voide API")
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