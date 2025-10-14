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
import { useState } from "react"

export const Header = () => {
    const navigate = useNavigate()
    const { logout, isAuth } = useAuth()
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen)
    }
    const closeDropdown = () => {
        setIsDropdownOpen(false)
    }

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

                <div className={`header_dropdown ${isDropdownOpen ? "header_dropdown_open" : ""}`}>
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