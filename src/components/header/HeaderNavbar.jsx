import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation, useNavigate } from "react-router-dom"

import routes from '../../routes'

export const HeaderNavbar = ({topFormat}) => {
    const {isAuth} = useAuth()

    const location = useLocation()
    const navigate = useNavigate()
    
    return (<>
        {!isAuth && <>
            <nav className="headerUnauthNavbarContainer">
                <a className="linkBtn" onClick={()=>{navigate(routes.HOME)}}>Главная</a>
                <a className="linkBtn">Преимущества</a>
                <a className="linkBtn">Как начать учиться</a>
                {/*<a className="linkBtn" onClick={()=>{navigate(routes.TARIFF)}}>Тарифы</a>*/}
                <a className="linkBtn" onClick={()=>{navigate(routes.TARIFF)}}>Тарифы</a>
                <a className="linkBtn">Отзывы</a>
                <a className="linkBtn">Партнеры</a>
                <a className="linkBtn">FAQ</a>
                <a className="linkBtn" onClick={()=>{navigate(routes.TASK)}}>Задания</a>
            </nav>
        </>}

        {isAuth && <>
            <div className="headerAuthNavbarContainer">
                {(location.pathname !== routes.ACCOUNT && location.pathname !== routes.ADMIN) && <>
                    <div className="headerCollapseContainer">
                        <input type="checkbox" id="headerCollapseCheckbox"></input>
                        <label className="btn defaultBtn" style={{width: "100px"}} for="headerCollapseCheckbox"><MenuIcon className="defaultBtnSvg"/><span>Меню</span></label>

                        <nav className={`${topFormat ? 'headerCollapseTop120' : 'headerCollapseTop140'}`}>
                            <a className="linkBtn">Преимущества</a>
                            <a className="linkBtn">Как начать учиться</a>
                            <a className="linkBtn">Отзывы</a>
                            <a className="linkBtn">Партнеры</a>
                            <a className="linkBtn">FAQ</a>
                        </nav>
                    </div>
                </>}
            </div>
            <nav className="headerAuthNavbarImportantContainer">
                <a className="linkBtn" onClick={()=>{navigate(routes.HOME)}}>Главная</a>
                {/*<a className="linkBtn" onClick={()=>{navigate(routes.TARIFF)}}>Тарифы</a>*/}
                <a className="linkBtn" onClick={()=>{navigate(routes.TARIFF)}}>Тарифы</a>
                <a className="linkBtn" onClick={()=>{navigate(routes.TASK)}}>Задания</a>
            </nav>
        </>}
    </>)
}