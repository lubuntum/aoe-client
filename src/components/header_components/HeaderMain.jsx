import "./css/header.css"

import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"

import { HeaderBurger } from "./HeaderBurger"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderOptions } from "./HeaderOptions"

import { getHeaderData } from "../../modules/api_modules/accountAPI"

export const HeaderMain = () => {
    const {isAuth} = useAuth()
    const [headerData, setHeaderData] = useState()
    const [headerTop, setHeaderTop] = useState(40)
    const [headerOpacity, setHeaderOpacity] = useState(1)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setHeaderOpacity(.3)
                setHeaderTop(20)
            } else {
                setHeaderOpacity(1)
                setHeaderTop(40)
            }
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    const handleMouseEnter = () => {
        setHeaderOpacity(1)
    }
    const handleMouseLeave = () => {
        if (window.scrollY > 0) {
            setHeaderOpacity(.3)
        }
    }

    /**TODO если запрос данных к header по токену вернул ошибку, значит токен истек,
     * инициировать процедуру выхода из аккаунта.
     */

    useEffect(()=>{
        if (!isAuth) return
        const fetchData = async () => {
            const response = await getHeaderData(localStorage.getItem("token"))
            console.log(`fetched user data => ${JSON.stringify(response.data)}`)
            setHeaderData(response.data)
        }
        fetchData()
    }, [])

    return(
        <div className="headerFixedContainer" style={{top: `${headerTop}px`}}>
            <div className="headerWrapper" 
                style={{opacity: headerOpacity}}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <div className="headerContainer">
                    <HeaderBurger/>
                    <HeaderLogo/>
                    <HeaderMenu/>
                    <HeaderOptions headerData = {headerData}/>
                </div>
            </div>
        </div>
    )
}
