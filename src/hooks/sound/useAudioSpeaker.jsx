import { useEffect, useRef } from "react"

export const useAudioSpeaker = () => {
    const audioRef = useRef(null)
    const speakAudio = (url, onEnd) => {
        if (!url){
            onEnd()
            return
        }
        if (audioRef.current) {
            audioRef.current.pause()
            audioRef.current.src = ""
        }
        const audio = new Audio(url)
        audioRef.current = audio
        audio.addEventListener("ended", () => cleanup(onEnd))
        audio.play().catch(err=>{
            console.error("Error while playing audio", err)
            onEnd()
        })
    }
    const cleanup = (onEnd) => {
        if (!audioRef.current) {
            onEnd()
            return
        }
        audioRef.current.removeEventListener("ended", cleanup)
        audioRef.current = null
        onEnd()
    }
    return {speakAudio}
}