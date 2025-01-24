import "./css/header.css"
import "./css/header_media.css"

import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { HeaderBurger } from "./HeaderBurger"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderOptions } from "./HeaderOptions"
import { getHeaderData } from "../../modules/api_modules/accountAPI"

const WIDTH_THRESHOLD = 500
const SCROLL_THRESHOLD = 20
const HEADER_TOP_DEFAULT = 40
const HEADER_TOP_SCROLLED = 20

const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
        if (timeoutId) { clearTimeout(timeoutId) }
        timeoutId = setTimeout(() => {
            func.apply(null, args)
        }, delay)
    }
}

export const HeaderMain = ({onScrollToSection}) => {
    const { isAuth, logout } = useAuth()
    const [headerData, setHeaderData] = useState()
    const [headerTop, setHeaderTop] = useState(40)

    const determineHeaderTop = useCallback(() => {
        const width = window.innerWidth
        const scrollY = window.scrollY
        if (width <= WIDTH_THRESHOLD) {
            return HEADER_TOP_SCROLLED
        }
        return scrollY < SCROLL_THRESHOLD ? HEADER_TOP_DEFAULT : HEADER_TOP_SCROLLED
    }, [])

    const updateHeaderTop = useCallback(() => {
        const newHeaderTop = determineHeaderTop()
        if (newHeaderTop !== headerTop) {
            setHeaderTop(newHeaderTop)
        }
    }, [determineHeaderTop, headerTop])

    const handleScroll = useCallback(() => {
        updateHeaderTop()
    }, [updateHeaderTop])

    const handleResize = useCallback(() => {
        updateHeaderTop()
    }, [updateHeaderTop])

    const debouncedHandleScroll = useCallback(debounce(handleScroll, 0), [handleScroll])
    const debouncedHandleResize = useCallback(debounce(handleResize, 0), [handleResize])

    useEffect(() => {
        window.addEventListener("scroll", debouncedHandleScroll)
        window.addEventListener("resize", debouncedHandleResize)
        updateHeaderTop()

        return () => {
            window.removeEventListener("scroll", debouncedHandleScroll)
            window.removeEventListener("resize", debouncedHandleResize)
        }
    }, [debouncedHandleScroll, debouncedHandleResize, updateHeaderTop])

    useEffect(()=>{
        if (!isAuth) return
        const fetchData = async () => {
            try {
                const response = await getHeaderData(localStorage.getItem("token"))
                setHeaderData(response.data)
            } catch (e) {
                logout()
            }   
        }
        fetchData()
    }, [isAuth, logout])

    return (
        <div className="headerFixedContainer" style={{top: `${headerTop}px`}}>
            <div className="headerWrapper" >
                <div className="headerContainer">
                    <HeaderBurger headerData={headerData} onScrollToSection={onScrollToSection}/>
                    <HeaderLogo/>
                    <HeaderMenu onScrollToSection={onScrollToSection}/>
                    <HeaderOptions headerData={headerData}/>
                </div>
            </div>
        </div>
    )
}
