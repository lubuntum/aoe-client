import { useAuth } from "../../modules/auth/AuthProvider"

import "./header.css"

import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

const Header = () => {
    const {logout, isAuth, getUsername} = useAuth()
    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <div className="headerLogoContainer">
                    <p>LOGO</p>
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
                        {(!isAuth && <a className="btn unAuthBurger" style={{display: 'none'}} onClick={{}}><MenuIcon className="svgIcon"/></a>)}
                    </div>
                    <div className="headerAccountContainer">
                        {(!isAuth && <a className="btn loginBtn" style={{width:'150px', fontWeight: '500'}} onClick={{}}>Войти</a>)}
                        {(!isAuth && <a className="btn hiddenLoginBtn" onClick={{}}><LoginIcon className="svgIcon"/></a>)}
                    </div>
                </>)} 

                {isAuth && (<>
                    <div className="headerMenuContainer">
                        <nav className="menuOptions">
                            <a href="#">Главная</a>
                            <a href="#">Тарифы</a>
                            <a href="#">Задания</a>
                        </nav>
                    </div>
                    <div className="headerAuthBurger">
                    {(isAuth && <a className="btn authBurger" style={{display: 'none'}} onClick={{}}><MenuIcon className="svgIcon"/></a>)}
                    </div>
                    <div className="headerAccountContainer">
                        <div className="dividerOptionsAccount"></div>
                        {(isAuth && <a className="btn tokensBtn" style={{width:'100px'}} onClick={{}}><BoltIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>)}
                        {(isAuth && <a className="btn tokensBtn" style={{width:'100px'}} onClick={{}}><FaceIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>)}
                        {(isAuth && <p className="accountName">{getUsername()}</p>)}
                        {(isAuth && <a className="btn logoutBtn" onClick={()=>{logout()}}><LogoutIcon className="svgIcon"/></a>)}
                    </div>
                </>)}
            </div>
        </div>
    )
}

export default Header