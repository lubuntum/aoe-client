import "./css/footer.css"
import "./css/footer_media.css"

import React, { useCallback } from "react"

import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button"
import routes from "../../routes"

import { ReactComponent as TelegramIcon } from "../../res/icons/telegram_24dp.svg"
import { ReactComponent as VKIcon } from "../../res/icons/vk_24dp.svg"


export const FooterMain = React.memo(({onScrollToSection}) => {
    const location = useLocation()
    const navigate = useNavigate()

    const createButtonFunc = useCallback((section) => {
        return location.pathname === routes.HOME ?
            onScrollToSection(section) :
            navigate(routes.HOME)
    }, [location.pathname, navigate, onScrollToSection])

    const buttonFooterNavigation = [
        {text: "Главная", func: () => createButtonFunc("section0")},
        {text: "Преимущества", func: () => createButtonFunc("section1")},
        {text: "Как начать учиться", func: () => createButtonFunc("section2")},
        {text: "Партнеры", func: () => createButtonFunc("section4")},
        {text: "FAQ", func: () => createButtonFunc("section5")},
        {text: "Пополнение баланса", func: () => navigate(routes.PRICING)},
        {text: "Варианты", func: () => navigate(routes.TASK)},
    ]

    return (
        <div className="sectionWrapper sectioFooterWrapper">
            <div className="contentWrapper">
                <div className="footerWrapper">
                    <div className="footerContentWrapper">
                        <div className="footerLogo footerColumn">
                            <p className="logo">LOGO</p>
                            <div className="footerSocials">
                                <a href="#"><TelegramIcon className="svgIcon"/></a>
                                <a href="#"><VKIcon className="svgIcon"/></a>
                            </div>
                        </div>
                        <div className="footerAbout footerColumn">
                            <p>Про нас</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt suscipit unde nam?</p>
                        </div>
                        <div className="footerNavigation footerColumn">
                            <p>Навигация</p>
                            {buttonFooterNavigation.map((item, index) => (
                                <Button key={`footerLink${index}`}
                                        buttonType={"link"}
                                        buttonText={item.text}
                                        buttonFunc={item.func}/>
                            ))}
                        </div>
                        <div className="footerContact footerColumn">
                            <p>Контакты</p>
                        </div>
                    </div>
                    <div className="footerBottomDivider"></div>
                    <div className="footerDocuments">
                        <a href="#">Документ 1</a>
                        <a href="#">Документ 2</a>
                        <a href="#">Политика конфиденциальности</a>
                        <a href="#">Публичная оферта</a>
                    </div>
                    <div className="footerCred">
                        <p>© Lorem, ipsum dolor.</p>
                    </div>
                </div>
            </div>
        </div>
    )
})