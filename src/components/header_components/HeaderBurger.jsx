import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderBurger = ({topFormat}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    return (<>
        <div className="headerBurgerContainer">
            <input type="checkbox" id="headerBurgerCheckbox"></input>
            <label className="btn defaultBtn" style={{width: "40px"}} for="headerBurgerCheckbox"><MenuIcon className="defaultBtnSvg"/></label>

            <nav className={`${topFormat ? 'headerBurgerTop120' : 'headerBurgerTop140'}`}>
                                                           <a className="linkBtn" onClick={()=>{navigate(routes.HOME)}}>Главная</a>
                {(location.pathname !== routes.ACCOUNT) && <a className="linkBtn">Преимущества</a>}
                {(location.pathname !== routes.ACCOUNT) && <a className="linkBtn">Как начать учиться</a>}
                                                           <a className="linkBtn" onClick={()=>{navigate(routes.TARIFF)}}>Тарифы</a>
                {(location.pathname !== routes.ACCOUNT) && <a className="linkBtn">Отзывы</a>}
                {(location.pathname !== routes.ACCOUNT) && <a className="linkBtn">Партнеры</a>}
                {(location.pathname !== routes.ACCOUNT) && <a className="linkBtn">FAQ</a>}
                                                           <a className="linkBtn" onClick={()=>{navigate(routes.TASK)}}>Задания</a>
                {(isAuth && (location.pathname !== routes.ACCOUNT)) && <a onClick={() => navigate(routes.ACCOUNT)}>Личный кабинет</a>}
            </nav>
        </div>
    </>)
}