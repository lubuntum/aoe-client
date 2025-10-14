import "./header_style.css"
import "./header_media_style.css"

import { useNavigate } from "react-router-dom"

import routes from "../../routes.js"
import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { Btn } from "../tme_reusable/Btn.jsx"
import { BtnLink } from "../tme_reusable/BtnLink.jsx"
import { BtnIcon } from "../tme_reusable/BtnIcon.jsx"

import { ReactComponent as MenuI } from "../../res/icons/menu_24dp_gi.svg"
import { ReactComponent as LogoutI } from "../../res/icons/logout_svg_gi_24p.svg"
import { useEffect, useRef, useState } from "react"

export const Header = () => {
    const navigate = useNavigate()
    const { logout, isAuth } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)
    const dropdownRef = useRef(null)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                closeDropdown()
            }
        }

        const handleScroll = () => {
            closeDropdown()
        }

        const handleTouchStart = (e) => {
            const touchStartX = e.touches[0].clientX
            const touchStartY = e.touches[0].clientY
            
            const handleTouchMove = (e) => {
                const touchCurrentX = e.touches[0].clientX
                const touchCurrentY = e.touches[0].clientY
                
                const deltaX = Math.abs(touchCurrentX - touchStartX)
                const deltaY = Math.abs(touchCurrentY - touchStartY)
                
                if (deltaX > 10 || deltaY > 10) {
                    closeDropdown();
                    document.removeEventListener('touchmove', handleTouchMove)
                }
            }

            document.addEventListener('touchmove', handleTouchMove)
            
            const handleTouchEnd = () => {
                document.removeEventListener('touchmove', handleTouchMove)
                document.removeEventListener('touchend', handleTouchEnd)
            }
            
            document.addEventListener('touchend', handleTouchEnd)
        }

        if (isDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside)
            document.addEventListener('scroll', handleScroll, true)
            document.addEventListener('touchstart', handleTouchStart)
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('scroll', handleScroll, true)
            document.removeEventListener('touchstart', handleTouchStart)
        }
    }, [isDropdownOpen])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 997) { 
                closeDropdown()
            }
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (<>
        <div className="header_fixed">
            <div className="header_logo">
                <p>TestMy<span>Eng</span></p>
            </div>

            <div className="header_desktop_nav">
                <BtnLink btnText={"Главная"} btnFunc={()=>navigate(routes.HOME)}/>

                <BtnLink btnText={"Преимущества"}/>

                <BtnLink btnText={"Как пользоваться"}/>

                <BtnLink btnText={"Варианты"} btnFunc={()=>navigate(routes.TASK)}/>
            </div>

            <div className="header_desktop_buttons">
                {!isAuth && <Btn btnText={"Войти"} btnFunc={()=>navigate(routes.AUTORIZATION)}/>}

                {isAuth && <BtnLink btnText={"Личный кабинет"} btnFunc={()=>navigate(routes.ACCOUNT)}/>}

                {isAuth && <BtnIcon btnIcon={<LogoutI className="svg_icon"/>} btnFunc={logout}/>}
            </div>
            
            <div className="header_mobile_buttons">
                <BtnIcon btnIcon={<MenuI className="svg_icon"/>} btnFunc={toggleDropdown}/>

                <div className={`header_dropdown ${isDropdownOpen ? "header_dropdown_open" : ""}`} ref={dropdownRef}>
                    <BtnLink btnText={"Главная"} btnFunc={()=>{navigate(routes.HOME); closeDropdown()}}/>

                    <BtnLink btnText={"Преимущества"} btnFunc={()=>{closeDropdown()}}/>

                    <BtnLink btnText={"Как пользоваться"} btnFunc={()=>{closeDropdown()}}/>

                    <BtnLink btnText={"Варианты"} btnFunc={()=>{navigate(routes.TASK); closeDropdown()}}/>

                    {!isAuth && <BtnLink btnText={"Войти"} btnFunc={()=>{navigate(routes.AUTORIZATION); closeDropdown()}}/>}

                    {isAuth && <BtnLink btnText={"Личный кабинет"} btnFunc={()=>{navigate(routes.ACCOUNT); closeDropdown()}}/>}

                    {isAuth && <BtnLink btnText={"Выход"} btnFunc={()=>{logout(); closeDropdown()}}/>}
                </div>
            </div>
            
            {isDropdownOpen && (
                <div className="dropdown_overlay" onClick={closeDropdown}></div>
            )}
        </div>
    </>)
}