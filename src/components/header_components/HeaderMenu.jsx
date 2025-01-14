import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useLocation, useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button.jsx"
import routes from '../../routes'
import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderMenu = ({onScrollToSection}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const buttonsUnauthNavbarContainer = [
        {text: "Главная", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section0") : ()=>navigate(routes.HOME)},
        {text: "Преимущества", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section1") : ()=>navigate(routes.HOME)},
        {text: "Как начать учиться", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section2") : ()=>navigate(routes.HOME)},
        {text: "Пополнение баланса", func:()=>{navigate(routes.PRICING)}},
        {text: "Партнеры", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section4") : ()=>navigate(routes.HOME)},
        {text: "FAQ", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section5") : ()=>navigate(routes.HOME)},
        {text: "Задания", func:()=>{navigate(routes.TASK)}},
    ]
    const buttonsAuthCollapseContainer = [
        {text: "Преимущества", func: location.pathname === routes.HOME ? ()=> onScrollToSection("section1") : ()=>navigate(routes.HOME)},
        {text: "Как начать учиться", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section2") : ()=>navigate(routes.HOME)},
        {text: "Партнеры", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section4") : ()=>navigate(routes.HOME)},
        {text: "FAQ", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section5") : ()=>navigate(routes.HOME)},
    ]
    const buttonsAuthNavbarContainer = [
        {text: "Главная", func: location.pathname === routes.HOME ? ()=> onScrollToSection("section0") : ()=>navigate(routes.HOME)},
        {text: "Пополнение баланса", func:()=>{navigate(routes.PRICING)}},
        {text: "Задания", func:()=>{navigate(routes.TASK)}},
    ]
    return (<>
        {!isAuth && <>
            <nav className="headerUnauthNavbarContainer">
                {buttonsUnauthNavbarContainer.map((button, index) => (
                    <Button key={index} buttonType={"link"} buttonText={button.text} buttonFunc={button.func}/>
                ))}
            </nav>
        </>}

        {isAuth && <>
            <div className="headerAuthNavbarContainer">
                {(location.pathname !== routes.ACCOUNT && location.pathname !== routes.ADMIN) && <>
                    <div className="headerCollapseContainer">
                        <input type="checkbox" id="headerCollapseCheckbox"></input>
                        <label className="btn defaultBtn" style={{width: "100px"}} for="headerCollapseCheckbox"><MenuIcon className="defaultBtnSvg"/><span>Меню</span></label>
                        <nav>
                            {buttonsAuthCollapseContainer.map((button, index) => (
                                <Button key={index} buttonType={"link"} buttonText={button.text} buttonFunc={button.func}/>
                            ))}
                        </nav>
                    </div>
                </>}
            </div>
            <nav className="headerAuthNavbarImportantContainer">
                {buttonsAuthNavbarContainer.map((button, index) => (
                    <Button key={index} buttonType={"link"} buttonText={button.text} buttonFunc={button.func}/>
                ))}
            </nav>
        </>}
    </>)
}