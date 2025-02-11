import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const PageTracking = () => {
    const location = useLocation()

    useEffect(() => {
        if (window.ym) {
            window.ym(99785402, 'hit', location.pathname)
        }
    }, [location])
}