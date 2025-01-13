import "./css/header.css"
import "./css/header_media.css"

import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth_modules/AuthProvider"

import { HeaderBurger } from "./HeaderBurger"
import { HeaderLogo } from "./HeaderLogo"
import { HeaderMenu } from "./HeaderMenu"
import { HeaderOptions } from "./HeaderOptions"

import { getHeaderData } from "../../modules/api_modules/accountAPI"

export const HeaderMain = ({onScrollToSection}) => {
    const {isAuth} = useAuth()
    const [headerData, setHeaderData] = useState()
    const [headerTop, setHeaderTop] = useState("40px")
    const [isScrolling, setIsScrolling] = useState(false)

    useEffect(() => {
        let timeoutId
        const handleScorll = () => {
            setIsScrolling(true)
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            timeoutId = setTimeout(() => {
                setIsScrolling(false)
            }, 100)
            
            if (window.scrollY > 20) {
                setHeaderTop("20px")
            } else {
                setHeaderTop("40px")
            }
        }
        window.addEventListener("scroll", handleScorll)
        return () => {
            window.removeEventListener("scroll", handleScorll)
            clearTimeout(timeoutId)
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

    return(
        <div className="headerFixedContainer" style={{top: headerTop}}>
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
