import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation } from "react-router-dom"
import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Burger = () => {
    const {isAuth, getUsername} = useAuth()
    const location = useLocation()

    return (<>
        <div className="navBurger" style={{display: "none"}}>
            <input type="checkbox" id="navBurgerCheckbox"></input>
            <label className="btn" for="navBurgerCheckbox"><MenuIcon className="svgIcon"/></label>
            <nav>
                <a href="#">Главная</a>
                {(location.pathname !== routes.ACCOUNT) && <a href="#">Преимущества</a>}
                {(location.pathname !== routes.ACCOUNT) && <a href="#">Как начать учиться</a>}
                <a href="#">Тарифы</a>
                {(location.pathname !== routes.ACCOUNT) && <a href="#">Отзывы</a>}
                {(location.pathname !== routes.ACCOUNT) &&  <a href="#">Партнеры</a>}
                {(location.pathname !== routes.ACCOUNT) && <a href="#">FAQ</a>}
                <a href="#">Задания</a>
                {(isAuth && (location.pathname !== routes.ACCOUNT)) && <a href="#">Личный кабинет</a>}
            </nav>
        </div>
    </>)
}