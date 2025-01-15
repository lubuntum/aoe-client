import "./css/footer.css"

import { useLocation, useNavigate } from "react-router-dom"
import routes from "../../routes"

import { Button } from "../reusible_components/Button"

import { ReactComponent as TelegramIcon } from "../../res/icons/telegram_24dp.svg"
import { ReactComponent as VKIcon } from "../../res/icons/vk_24dp.svg"

export const FooterMain = ({onScrollToSection}) => {
    const location = useLocation()
    const navigate = useNavigate()
    const buttonFooterNavigation = [
        {text: "Главная", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section0") : ()=>navigate(routes.HOME)},
        {text: "Преимущества", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section1") : ()=>navigate(routes.HOME)},
        {text: "Как начать учиться", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section2") : ()=>navigate(routes.HOME)},
        {text: "Партнеры", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section4") : ()=>navigate(routes.HOME)},
        {text: "FAQ", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section5") : ()=>navigate(routes.HOME)},
        {text: "Пополнение баланса", func: ()=>{navigate(routes.PRICING)}},
        {text: "Варианты", func: ()=>{navigate(routes.TASK)}},
    ]
    return (<>
        <div className="sectionWrapper sectioFooterWrapper">
            <div className="contentWrapper">
                <div className="footerWrapper">
                    <div className="footerContentWrapper">
                        <div className="footerLogo footerColumn">
                            <p className="logo">LOGO</p>
                            <div className="footerSocials">
                                <a href=""><TelegramIcon className="svgIcon"/></a>
                                <a href=""><VKIcon className="svgIcon"/></a>
                            </div>
                        </div>
                        <div className="footerAbout footerColumn">
                            <p>Про нас</p>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deserunt suscipit unde nam?</p>
                        </div>
                        <div className="footerNavigation footerColumn">
                            <p>Навигация</p>
                            {buttonFooterNavigation.map((button, index) => (
                                <Button key={`footer${index}`}
                                        buttonType={"link"}
                                        buttonText={button.text}
                                        buttonFunc={button.func}/>
                            ))}
                        </div>
                        <div className="footerContact footerColumn">
                            <p>Контакты</p>
                        </div>
                    </div>
                    <div className="footerBottomDivider"></div>
                    <div className="footerDocuments">
                        <a href="">Документ 1</a>
                        <a href="">Документ 2</a>
                        <a href="">Политика конфиденциальности</a>
                        <a href="">Публичная оферта</a>
                    </div>
                    <div className="footerCred">
                        <p>© Lorem, ipsum dolor.</p>
                        <p>Разработка сервиса - <span>timofeyershovv@gmail.com</span>, <span>lubuntum@gmail.com</span></p>
                    </div>
                </div>
            </div>
        </div>
    </>)
}