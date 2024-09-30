import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation } from "react-router-dom"
import routes from '../../routes'
import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Navbar = () => {
    const {logout, isAuth, getUsername} = useAuth()
    const location = useLocation()
    return (<>
    <nav className="nav collapseNav">
        <a href="#">Главная</a>
        <a href="#">Преимущества</a>
        <a href="#">Как начать учиться</a>
        <a href="#">Тарифы</a>
        <a href="#">Отзывы</a>
        <a href="#">Партенры</a>
        <a href="#">FAQ</a>
        <a href="#">Задания</a>
    </nav>

    {!isAuth && (<>
    <nav className="nav">
        <a href="#">Главная</a>
        <a href="#">Преимущества</a>
        <a href="#">Как начать учиться</a>
        <a href="#">Тарифы</a>
        <a href="#">Отзывы</a>
        <a href="#">Партенры</a>
        <a href="#">FAQ</a>
        <a href="#">Задания</a>
    </nav>
    </>)}

    {isAuth && (<>
    <div className="authNav">
        <div className="navMenuBurger">
            <a className={`btn ${location.pathname === routes.ACCOUNT ? 'menuhHidden' : 'menuVisible'}`} onClick={{}} style={{width: '120px'}}><MenuIcon className="svgIcon"/>Меню</a>
        </div>

        <nav className="nav collapseAuthNav">
            <a href="#">Преимущества</a>
            <a href="#">Как начать учиться</a>
            <a href="#">Отзывы</a>
            <a href="#">Партенры</a>
            <a href="#">FAQ</a>
        </nav>

        <nav className="nav">
            <a href="#">Главная</a>
            <a href="#">Тарифы</a>
            <a href="#">Задания</a>
        </nav>
    </div>
    </>)}

    <div className="hiddenNavBurger" style={{display: 'none'}}>
        <a className="btn" onClick={{}}><MenuIcon className="svgIcon"/></a>
    </div>
    </>
    )
}


