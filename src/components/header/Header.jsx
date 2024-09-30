import { useAuth } from "../../modules/auth/AuthProvider"
import { useLocation } from "react-router-dom"
import routes from '../../routes';

import "./header.css"

import "./Logo"
import "./Navbar"
import "./Options"


import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { Logo } from "./Logo";
import { Navbar } from "./Navbar";
import { Options } from "./Options";

const Header = () => {
    const {logout, isAuth, getUsername} = useAuth()

    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <Logo/>
                <Navbar/>
                <Options/>
            </div>
        </div>
    )
}

export default Header