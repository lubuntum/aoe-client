import "./css/header.css"
import "./css/header_media.css"

import { useCallback, useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { HeaderBurger } from "./HeaderBurger"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderOptions } from "./HeaderOptions"
import { getHeaderData } from "../../modules/api_modules/accountAPI"

export const HeaderMain = ({onScrollToSection}) => {
    const { isAuth, logout } = useAuth()
    const [headerData, setHeaderData] = useState()
    const [headerTop, setHeaderTop] = useState(40)
    const [isScrolling, setIsScrolling] = useState(false)

    const handleScroll = useCallback(() => {
        setIsScrolling(true)
        if (window.scrollY > 20) {
            setHeaderTop(20)
        } else {
            setHeaderTop(40)
        }
    }, [])

    useEffect(() => {
        const handleScorllDebounced = () => {
            handleScroll()
            setTimeout(() => {
                setIsScrolling(false)
            }, 500)
        }
        window.addEventListener("scroll", handleScorllDebounced)
        return () => {
            window.removeEventListener("scroll", handleScorllDebounced)
        }
    }, [handleScroll])

    useEffect(()=>{
        if (!isAuth) return
        const fetchData = async () => {
            try {
                const response = await getHeaderData(localStorage.getItem("token"))
                setHeaderData(response.data)
                console.log(response.data)
            } catch(e) {
                logout()
            }   
        }
        fetchData()
    }, [isAuth, logout])

    return (
        <div className="headerFixedContainer" style={{top: `${headerTop}px`}}>
            <div className="headerWrapper" 
                style={{opacity: isScrolling ? .3 : 1}}>
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
