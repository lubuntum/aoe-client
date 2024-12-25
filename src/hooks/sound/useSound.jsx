import { useEffect, useRef, useState } from "react"

export const useSound = (url) => {
    const audioRef = useRef(new Audio(url))
    const actualEventRef = useRef()
    const handleEndedEvent = () => {
        actualEventRef.current()
        audioRef.current.removeEventListener('ended', actualEventRef.current)
    }
    const play = () => {
        audioRef.current.play()
    }
    const playAndEvent = (event) => {
        actualEventRef.current = event
        //audioRef.current.addEventListener("ended", event)
        audioRef.current.play()
    }
    const pause = () => {
        audioRef.current.pause()
    }
    const stop = () => {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
    }
    useEffect(()=>{
        audioRef.current.addEventListener('ended', handleEndedEvent)
        return () => {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            audioRef.current.removeEventListener('ended', handleEndedEvent)
        }
    },[])

    return {play, playAndEvent, pause, stop}
}