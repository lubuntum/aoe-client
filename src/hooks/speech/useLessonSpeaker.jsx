import { useEffect, useRef, useState } from "react"

export const useLessonSpeaker = () => {
    const voice = useRef()
    let endSpeechTimer = null
    useEffect(()=>{
        const synth = window.speechSynthesis
        const findEnglishVoice = () => {
            const synth = window.speechSynthesis
            const voices = synth.getVoices()
            voice.current = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
            //return voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
        }
        if (synth.onvoiceschanged !== undefined)
            synth.onvoiceschanged = findEnglishVoice
        findEnglishVoice()
    }, [])
    const speak = (text, onEndCallback) => {
        if(window.speechSynthesis.speaking) 
            window.speechSynthesis.cancel()
        speakDefault(text, onEndCallback)

        endSpeechTimer = setTimeout(()=>{
            if (!window.speechSynthesis.speaking){
                console.warn("Time to TTS ended")
                onEndCallback()
            }
        }, 30000)
    }
    const speakDefault = (text, onEndCallback) => {
        try {
            const speechTemp = new SpeechSynthesisUtterance(text)
            speechTemp.lang = "en-US"
            
            if (voice.current) 
                speechTemp.voice = voice.current
            else {
                const synth = window.speechSynthesis
                const voices = synth.getVoices()
                voice.current = voices.find(voice => voice.lang === 'en-US' || voice.lang === 'en-GB')
                //onEndCallback()
            }
            speechTemp.onend = () => {
                onEndCallback()
                console.log("speech ended")
                if(endSpeechTimer !== null) clearTimeout(endSpeechTimer)
            }
            speechTemp.onerror = () => {
                console.error("Default speech did not start")
                if(endSpeechTimer !== null) clearTimeout(endSpeechTimer)
                onEndCallback()
            }
            window.speechSynthesis.speak(speechTemp);
        } catch (err) {
            if (err !== undefined) console.error(err)
            onEndCallback()
        }
    }

    useEffect(()=>{
        return () => {
            if(endSpeechTimer !== null) clearTimeout(endSpeechTimer)
        }
    })
    
    return {speak, speakDefault}
}


/*
const responsiveVoiceMonitoring = (text, onEndCallback) =>{
        const socket = new WebSocket('wss://192.168.65.55:3000/ws');
        socket.onopen = () => {
            console.log('WebSocket connection established');
        };

        socket.onmessage = (event) => {
            console.log('Message received:', JSON.parse(event.data));
            //if(event.data.type === "warnings") 
            //    speakDefault(text, onEndCallback)
            
        };

        socket.onerror = (error) => {
            console.error('WebSocket error observed:', error);
            //speakDefault(text, onEndCallback)
            // You can also log the error to an external monitoring service here
        };

        socket.onclose = (event) => {
            console.log('WebSocket connection closed:', event);
            if(!event.wasClean)
                speakDefault(text, onEndCallback)
        };
    }

*/

/*
try {
            if (window.responsiveVoice) {
                if (window.speechSynthesis.speaking)
                    window.speechSynthesis.cancel()
                window.responsiveVoice.speak(text, "UK English Female", {
                    onstart: () => {console.log("starting...")},
                    onend: () => { onEndCallback() }, // Corrected from oneng to onend
                    onerror: (error) => {
                        console.error("Error in response voice", error)
                        speakDefault(text, onEndCallback)
                    }
                })
            
            } else {
                console.error("Cant connect to responsive voice")
                speakDefault(text, onEndCallback)
            }
        } catch(err) {
            if (err !== undefined) console.error(err)
            console.log("Some error occurred while using responsive voide API")
            speakDefault(text, onEndCallback)
        }


*/