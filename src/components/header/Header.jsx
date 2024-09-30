import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation } from "react-router-dom"
import { ACCOUNT  } from "../../config"

import "./header.css"

import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

const Header = () => {
    const {logout, isAuth, getUsername} = useAuth()

    const location = useLocation()

    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <div className="headerLogoContainer">
                    <p>{ location.pathname }</p>
                </div>

                {!isAuth && (<>
                    <div className="headerNavContainer">
                        <nav className="headerNavbarContainer">
                            <a href="#">Главная</a>
                            <a href="#">Преимущества</a>
                            <a href="#">Как начать учиться</a>
                            <a href="#">Тарифы</a>
                            <a href="#">Отзывы</a>
                            <a href="#">Партенры</a>
                            <a href="#">FAQ</a>
                            <a href="#">Задания</a>
                        </nav>
                    </div>
                    <div className="headerUnAuthBurger">
                        <a className="btn unAuthBurger" style={{display: 'none'}} onClick={{}}><MenuIcon className="svgIcon"/></a>
                    </div>
                    <div className="headerAccountContainer">
                        <a className="btn loginBtn" style={{width:'150px', fontWeight: '500'}} onClick={{}}>Войти</a>
                        <a className="btn hiddenLoginBtn" style={{display: 'none'}} onClick={{}}><LoginIcon className="svgIcon"/></a>
                    </div>
                </>)}

                {(isAuth && location.pathname === ACCOUNT) && (<>
                    <div className="headerMenuContainer">
                        <nav className="menuOptions">
                            <a href="#">Главная</a>
                            <a href="#">Тарифы</a>
                            <a href="#">Задания</a>
                        </nav>
                    </div>
                    <div className="headerAuthBurger">
                        <a className="btn authBurger" style={{display: 'none'}} onClick={{}}><MenuIcon className="svgIcon"/></a>
                    </div>
                    <div className="headerAccountContainer">
                        <div className="dividerOptionsAccount"></div>
                        <a className="btn tokensBtn" style={{width:'100px'}} onClick={{}}><BoltIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
                        <a className="btn tokensBtn" style={{width:'100px'}} onClick={{}}><FaceIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
                        <p className="accountName">{getUsername()}</p>
                        <a className="btn logoutBtn" onClick={()=>{logout()}}><LogoutIcon className="svgIcon"/></a>
                    </div>
                </>)}
            </div>
        </div>
    )
}

export default Header