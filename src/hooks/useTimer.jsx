import { useCallback, useEffect, useRef, useState } from "react"

export const useTimer = (sec, callback) => {
    const [time, setTime] = useState(sec)
    const timerIdRef = useRef(null)
    const initialTimeRef = useRef(sec)

    useEffect(() => {
        initialTimeRef.current = sec
        setTime(sec)
    }, [])

    useEffect(()=>{
        if (time > 0) {
            timerIdRef.current = setInterval(()=> {
                setTime(prev => {
                    const newTime = prev - 1

                    return newTime
                })
            }, 1000)

            return () => {
                if (timerIdRef.current) {
                    clearInterval(timerIdRef.current)
                }
            }
        } else {
            callback()
        }
    }, [time, callback,timerIdRef])

    const resetTimer = useCallback(() => {
        setTime(sec)

        if (timerIdRef.current) {
            clearInterval(timerIdRef.current)
        }
    }, [sec])

    useEffect(() => {
        return () => {
            if (timerIdRef.current) {
                clearInterval(timerIdRef.current)
            }
        }
    }, [])

    return { time, resetTimer }
}