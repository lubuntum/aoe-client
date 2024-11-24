import "./header.css"

import { useEffect, useState } from "react"
import { useAuth } from "../../modules/auth/AuthProvider"
import { Logo } from "./Logo"
import { Burger } from "./Burger"
import { Navbar } from "./Navbar"
import { Options } from "./Options"
import { getHeaderData } from "../../modules/api/account/AccountApi"

export const Header = () => {
    const [headerData, setHeaderData] = useState()
    const {isAuth} = useAuth()
    useEffect(()=>{
        if (!isAuth) return
        const fetchData = async () => {
            const response = await getHeaderData(localStorage.getItem("token"))
            console.log(`fetched user data => ${JSON.stringify(response.data)}`)
            setHeaderData(response.data)
        }
        fetchData()
    }, [])

    const [burgerTop, setBurgerTop] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setBurgerTop(true);
            } else {
                setBurgerTop(false);
            }
        }

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])

    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <Burger burgerTop = {burgerTop}/>
                <Logo/>
                <Navbar/>
                <Options headerData = {headerData}/>
            </div>
        </div>
    )
}

export default Header