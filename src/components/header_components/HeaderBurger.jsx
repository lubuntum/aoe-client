import React, { useCallback } from "react"

import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button"
import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderBurger = React.memo(({headerData, onScrollToSection}) => {
    const {isAuth, checkAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const createButtonFunc = useCallback((section) => {
        return location.pathname === routes.HOME ?
            () => onScrollToSection(section) :
            () => navigate(routes.HOME)
    }, [location.pathname, navigate, onScrollToSection])

    const buttonsBurgerContainer = [
        {text: "Главная", func: createButtonFunc("section0")},
        {text: "Преимущества", func: createButtonFunc("section1")},
        {text: "Как пользоваться", func: createButtonFunc("section2")},
        {text: "Преимущества подписки", func: createButtonFunc("section3")},
        {text: "FAQ", func: createButtonFunc("section5") },
    ]

    return (
        <div className="headerBurgerContainer">
            <input type="checkbox" id="headerBurgerCheckbox"></input>
            <button className="button" onClick={() => document.getElementById("headerBurgerCheckbox").checked = !document.getElementById("headerBurgerCheckbox").checked}>
                <span><MenuIcon className="svgIcon"/></span>
            </button>

            <nav>
                {!isAuth && buttonsBurgerContainer.map((item, index) => (
                    <Button key={`headerBurger${index}`}
                            buttonType={"link"}
                            buttonText={item.text}
                            buttonFunc={item.func}/>
                ))}

                {isAuth && (
                    <Button key={`headerBurger3`}
                            buttonType={"link"}
                            buttonText={"Главная"} 
                            buttonFunc={createButtonFunc("section0")}/>
                )}

                <Button key={`headerBurger4`}
                        buttonType={"link"}
                        buttonText={"Варианты"} 
                        buttonFunc={()=>navigate(routes.TASK)}/>

                {isAuth ? (
                    <Button key={`headerBurger5`}
                            buttonType={"link"}
                            buttonText={"Подписка"} 
                            buttonFunc={()=>navigate(routes.PRICING)}/>
                ) : (
                    <Button key={`headerBurger6`}
                            buttonType={"link"}
                            buttonText={"Услуги и цены"} 
                            buttonFunc={()=>navigate(routes.PRICING)}/>
                )}
                
                {isAuth && (
                    <Button key={`headerBurger7`}
                            buttonType={"link"}
                            buttonText={"Личный кабинет"} 
                            buttonFunc={()=>navigate(routes.ACCOUNT)}/>
                )}

                {(isAuth && headerData) && (
                    <Button key={`headerBurger8`}
                            buttonType={"link"}
                            buttonText={`Баланс: ${headerData.currentBalance || 0} ₽`} 
                            buttonFunc={()=>navigate(routes.PRICING)}/>
                )}
                
                {isAuth && headerData?.roles.includes("admin") && (
                    <Button key={`headerBurger9`}
                            buttonType={"link"}
                            buttonText={"Кабинет админа"} 
                            buttonFunc={()=>navigate(routes.ADMIN)}/>
                )}

                {isAuth && headerData?.roles.includes("partner") && (
                    <Button key={`headerBurger10`}
                            buttonType={"link"}
                            buttonText={"Кабинет партнера"} 
                            buttonFunc={()=>navigate(routes.PARTNER)}/>
                )}
            </nav>
        </div>
    )
})