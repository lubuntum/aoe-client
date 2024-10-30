import { useEffect, useRef, useState } from "react"

export const useTimer = (sec, callback) => {
    const [time, setTime] = useState(sec)
    const timerIdRef = useRef(null)
    useEffect(()=>{
        if (time > 0) {
            timerIdRef.current = setInterval(()=> {
                setTime(prev => prev - 1)
            }, 1000)
            return () => clearInterval(timerIdRef.current)
        } else {
            callback()
        }
    }, [time, callback,timerIdRef])
    const resetTimer = () => {
        setTime(sec)
    }
    
    useEffect(()=>{
        return () => {
            if (timerIdRef.current) clearInterval(timerIdRef.current)
        }
    })
    return {time, resetTimer}
}