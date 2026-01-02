import "./footer_style.css"
import "./footer_media_style.css"

import { useLocation, useNavigate } from "react-router-dom"

import routes from "../../routes.js"
import { BtnLink } from "../tme_reusable/BtnLink"

import { ReactComponent as TelegramI } from "../../res/icons/telegram_24dp.svg"
import { ReactComponent as VKI } from "../../res/icons/vk_24dp.svg"
import { useCallback } from "react"

/**
 * Компонент футера сайта с навигацией, контактами и информацией
 * @component
 * @returns {JSX.Element} Компонент футера
 */
export const Footer = () => {
    const location = useLocation()
    const navigate = useNavigate()

    /**
     * Прокручивает к секции на главной странице
     * @param {string} sectionId - ID секции для прокрутки
     */
    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            const elementPosition = element.getBoundingClientRect().top
            const offsetPosition = elementPosition + window.pageYOffset - 75
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth',
                block: 'start'
            })
        }
    }, [])

    /**
     * Обрабатывает переход на главную с последующей прокруткой
     * @param {string} sectionId - ID секции для прокрутки
     */
    const navigateToHomeWithScroll = useCallback((sectionId) => {
        if (location.pathname === routes.HOME) {
            // Если уже на главной, просто прокручиваем
            scrollToSection(sectionId)
        } else {
            // Если не на главной, переходим на главную и передаем sectionId в состоянии
            navigate(routes.HOME, { 
                state: { 
                    scrollToSection: sectionId,
                    scrollImmediately: true
                } 
            })
        }
    }, [location.pathname, navigate, scrollToSection])

    /**
     * Обрабатывает клик по навигационной кнопке с возможностью прокрутки
     * @param {string} sectionId - ID секции для прокрутки
     */
    const handleFooterNavClick = useCallback((sectionId) => {
        navigateToHomeWithScroll(sectionId)
    }, [navigateToHomeWithScroll])

    /**
     * Обрабатывает клик по логотипу - прокручивает вверх или переходит на главную
     * @type {Function}
     */
    const handleLogoClick = useCallback(() => {
        if (location.pathname === routes.HOME) {
            window.scrollTo(0, 0)
        }
        else {
            navigate(routes.HOME)
        }  
    }, [location.pathname, navigate])

    return (<>
        <div className="footer">
            <div className="footer_wrapper">
                <div className="footer_info">
                    <div className="footer_container">
                        <div className="footer_logo" onClick={handleLogoClick}>
                            <p>TestMy<span>Eng</span></p>
                        </div>

                        <div className="footer_socials">
                            <TelegramI 
                                className="svg_icon" 
                                onClick={() => window.open("https://t.me/aoe_channel1", "_blank")}
                                title="Телеграм канал"/>
                            <VKI 
                                className="svg_icon" 
                                onClick={() => window.open("https://vk.com/academy_oe", "_blank")}
                                title="Группа ВКонтакте"/>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>О нас</p>
                        </div>

                        <div className="footer_body">
                            <p>Сервис подготовки к устной части ЕГЭ по английскому языку с котиками и печеньками</p>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>Навигация</p>
                        </div>

                        <div className="footer_body">
                            <BtnLink 
                                btnText={"Главная"}
                                btnFunc={() => handleFooterNavClick("main_banner_section")}
                                title="Перейти к главному баннеру"/>
                            <BtnLink 
                                btnText={"Преимущества"}
                                btnFunc={() => handleFooterNavClick("main_advantages_section")}
                                title="Перейти к преимуществам"/>
                            <BtnLink 
                                btnText={"Как пользоваться"}
                                btnFunc={() => handleFooterNavClick("main_guide_section")}
                                title="Перейти к инструкции"/>
                            <BtnLink 
                                btnText={"Варианты"} 
                                btnFunc={() => navigate(routes.TASK)}
                                title="Перейти к вариантам заданий"/>
                        </div>
                    </div>

                    <div className="footer_container">
                        <div className="footer_title">
                            <p>Контакты</p>
                        </div>

                        <div className="footer_body">
                            <p>Осипов Вячеслав Сергеевич</p>
                            <p>osipowvs@gmail.com</p>
                            <p>+7 (906) 190 10-50</p>
                            <p>ИНН 1900012716</p>
                        </div>
                    </div>
                </div>

                <div className="footer_divider"></div>

                <div className="footer_bottom">
                    <div className="footer_docs">
                        <BtnLink 
                            btnText={"Политика конфиденциальности"} 
                            btnFunc={() => window.open(routes.PRIVACY_POLICE, "_blank")}
                            title="Открыть политику конфиденциальности"/>
                        <BtnLink 
                            btnText={"Пользовательское соглашение"} 
                            btnFunc={() => window.open(routes.USER_AGREEMENT, "_blank")}
                            title="Открыть пользовательское соглашение"/>
                    </div>

                    <div className="footer_meta">
                        <p>© ООО "Цифровые образовательные решения"</p>
                        <p>client build 1.6.22</p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}