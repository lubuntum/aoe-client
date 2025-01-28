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
        {text: "Подписка", func: () => createButtonFunc("section3")},
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
                            <p className="logo">TestMy<span>Eng</span></p>
                            <div className="footerSocials">
                                <a href="#"><TelegramIcon className="svgIcon"/></a>
                                <a href="#"><VKIcon className="svgIcon"/></a>
                            </div>
                        </div>
                        <div className="footerAbout footerColumn">
                            <p>Про нас</p>
                            <p>Сервис подготовки к устной части ЕГЭ по английскому языку с котиками и печеньками.</p>
                        </div>
                        <div className="footerNavigation footerColumn">
                            <p>Навигация</p>
                            {buttonFooterNavigation.map((item, index) => (
                                <Button key={`footerLink${index}`}
                                        buttonType={"link footerButtonLink"}
                                        buttonText={item.text}
                                        buttonFunc={item.func}/>
                            ))}
                        </div>
                        <div className="footerContact footerColumn">
                            <p>Контакты</p>
                            <p><span>ФИО: </span>Осипов Вячеслав Сергеевич</p>
                            <p><span>Email: </span>osipowvs@gmail.com</p>
                            <p><span>Номер тел.: </span>+7(902)014-3737</p>
                            <p><span>ИНН: </span>1900012716</p>
                        </div>
                    </div>
                    <div className="footerBottomDivider"></div>
                    <div className="footerDocuments">
                        <a onClick={()=>navigate(routes.PRIVACY_POLICE)}>Privacy Police</a>
                        <a onClick={()=>navigate(routes.USER_AGREEMENT)}>Пользовательское соглашение</a>
                    </div>
                    <div className="footerCred">
                        <p>© ООО "Цифровые образовательные решения"</p>
                    </div>
                </div>
            </div>
        </div>
    )
})