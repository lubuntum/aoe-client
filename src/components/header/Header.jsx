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
    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <Burger/>
                <Logo/>
                <Navbar/>
                <Options headerData = {headerData}/>
            </div>
        </div>
    )
}

export default Header