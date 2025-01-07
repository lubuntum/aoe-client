import "./css/header.css"
import "./css/header_logo.css"
import "./css/header_burger.css"
import "./css/header_navbar.css"
import "./css/header_options.css"
import "./css/header_media.css"

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
    const [burgersTopFormat, setBurgersTopFormat] = useState(false);

    const [headerOpacity, setHeaderOpacity] = useState(1)
    const handleScroll = () => {
        if (window.scrollY > 0) {
            setHeaderOpacity(.3)
        } else {
            setHeaderOpacity(1)
        }
    }
    const handleMouseEnter = () => {
        setHeaderOpacity(1)
    }
    const handleMouseLeave = () => {
        if (window.scrollY > 0) {
            setHeaderOpacity(.3)
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])
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

    useEffect(() => {
        const handleScroll = () => {
            {window.scrollY > 20 ? setBurgersTopFormat(true) : setBurgersTopFormat(false)}
        }
        window.addEventListener('scroll', handleScroll);
        return () => {window.removeEventListener('scroll', handleScroll);}
    }, [])

    return(
        <div className="headerWrapper" 
             style={{opacity: headerOpacity, transition: "all .2s ease"}}
             onMouseEnter={handleMouseEnter}
             onMouseLeave={handleMouseLeave}>
            <div className="headerContainer">
                <HeaderBurger topFormat = {burgersTopFormat}/>
                <HeaderLogo/>
                <HeaderMenu topFormat = {burgersTopFormat}/>
                <HeaderOptions headerData = {headerData}/>
            </div>
        </div>
    )
}
