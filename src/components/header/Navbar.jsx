import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation } from "react-router-dom"
import routes from '../../routes'
import { Collapse } from "./Collapse"

export const Navbar = () => {
    const {logout, isAuth, getUsername} = useAuth()
    const location = useLocation()
    return (<>
        {!isAuth && (
            <nav className="unAuthHeaderNav">
                <a href="#">Главная</a>
                <a href="#">Преимущества</a>
                <a href="#">Как начать учиться</a>
                <a href="#">Тарифы</a>
                <a href="#">Отзывы</a>
                <a href="#">Партнеры</a>
                <a href="#">FAQ</a>
                <a href="#">Задания</a>
            </nav>
        )}

        {isAuth && (<>
            <div className="authHeaderNav">
                {(location.pathname !== routes.ACCOUNT) && (<Collapse/>)}
                <nav>
                    <a href="#">Главная</a>
                    <a href="#">Тарифы</a>
                    <a href="#">Задания</a>
                </nav>
            </div>
        </>)}
    </>)
}