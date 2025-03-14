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
        {text: "FAQ", func: () => createButtonFunc("section5")},
        {text: "Услуги и цены", func: () => navigate(routes.PRICING)},
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
                                <a onClick={()=>{window.open("https://t.me/aoe_channel1", "_blank")}}><TelegramIcon className="svgIcon"/></a>
                                <a onClick={()=>{window.open("https://vk.com/academy_oe", "_blank")}}><VKIcon className="svgIcon"/></a>
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
                            <p><span>Тел.: </span>+7(906) 190 10-50</p>
                            <p><span>ИНН: </span>1900012716</p>
                        </div>
                    </div>
                    <div className="footerBottomDivider"></div>
                    <div className="footerDocuments">
                        <a onClick={()=>{window.open(routes.PRIVACY_POLICE, "_blank")}}>Privacy Police</a>
                        <a onClick={()=>{window.open(routes.USER_AGREEMENT, "_blank")}}>Пользовательское соглашение</a>
                    </div>
                    <div className="footerCred">
                        <p>© ООО "Цифровые образовательные решения"</p>
                        <p>build v1.6.0</p>
                    </div>
                </div>
            </div>
        </div>
    )
})