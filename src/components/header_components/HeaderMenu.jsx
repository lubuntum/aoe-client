import React, { useCallback } from "react"

import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button.jsx"
import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderMenu = React.memo(({onScrollToSection}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    const createButtonFunc = useCallback((section) => {
        return location.pathname === routes.HOME ?
            () => onScrollToSection(section) :
            () => navigate(routes.HOME)
    }, [location.pathname, navigate, onScrollToSection])

    const buttonsUnauthNavbarContainer = [
        {text: "Главная", func: createButtonFunc("section0")},
        {text: "Преимущества", func: createButtonFunc("section1")},
        {text: "Как начать учиться", func: createButtonFunc("section2")},
        {text: "Подписка", func: createButtonFunc("section3")},
        {text: "FAQ", func: createButtonFunc("section5")},
        {text: "Пополнение баланса", func: () => navigate(routes.PRICING)},
        {text: "Варианты", func: () => navigate(routes.TASK)}
    ]

    const buttonsAuthCollapseContainer = [
        {text: "Преимущества", func: createButtonFunc("section1")},
        {text: "Как начать учиться", func: createButtonFunc("section2")},
        {text: "Подписка", func: createButtonFunc("section3")},
        {text: "FAQ", func: createButtonFunc("section5")}
    ]

    const buttonsAuthNavbarContainer = [
        {text: "Главная", func: createButtonFunc("section0")},
        {text: "Пополнение баланса", func: () => navigate(routes.PRICING)},
        {text: "Варианты", func: () => navigate(routes.TASK)}
    ]

    return (<>
        {!isAuth ? (
            <nav className="headerUnauthNavbarContainer">
                {buttonsUnauthNavbarContainer.map((item, index) => (
                    <Button key={`unauthNavbar${index}`}
                            buttonType={"link"}
                            buttonText={item.text}
                            buttonFunc={item.func}/>
                ))}
            </nav>   
        ) : (
            <>
                <div className="headerAuthNavbarContainer">
                    {(location.pathname !== routes.ACCOUNT && location.pathname !== routes.ADMIN) && (
                        <div className="headerCollapseContainer">
                            <input type="checkbox" id="headerCollapseCheckbox"></input>
                            <button className="button" style={{padding: "0 20px"}} onClick={() => document.getElementById("headerCollapseCheckbox").checked = !document.getElementById("headerCollapseCheckbox").checked}>
                                <span><MenuIcon className="svgIcon"/> Меню</span>
                            </button>

                            <nav>
                                {buttonsAuthCollapseContainer.map((item, index) => (
                                    <Button key={`authNavbar${index}`}
                                            buttonType={"link"}
                                            buttonText={item.text}
                                            buttonFunc={item.func}/>
                                ))}
                            </nav>
                        </div>
                    )}
                </div>
                <nav className="headerAuthNavbarImportantContainer">
                    {buttonsAuthNavbarContainer.map((item, index) => (
                        <Button key={`authImpNavbar${index}`}
                                buttonType={"link"}
                                buttonText={item.text}
                                buttonFunc={item.func}/>
                    ))}
                </nav>
            </>
        )}
    </>)
})
