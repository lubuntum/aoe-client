import { useEffect, useRef } from "react"

export const useLessonSpeaker = (task, stage, setNextStage) => {
    const speechRef = useRef(null)
    useEffect(()=>{
        const speechTemp = new SpeechSynthesisUtterance()
        speechTemp.lang = "en-US"
        speechRef.current = speechTemp
    }, [speechRef])

    return (speechRef)
}