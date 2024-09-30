import { useAuth } from "../../modules/auth/AuthProvider"
import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Options = () => {
    const {logout, isAuth, getUsername} = useAuth()
    return (<>
        <div className="headerOptions">
            {isAuth && (<>
                <div className="divider"></div>

                <div className="optionsTokens">
                    <a href="#" className="btn"><BoltIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
                    <a href="#" className="btn"><FaceIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
                </div>

                <div className="optionsUsername">
                    <a href="#">{getUsername()}</a>
                </div>

                <div className="optionsLogout">
                    <a className="btn" onClick={() => {logout()}}><LogoutIcon className="svgIcon"/></a>
                </div>
            </>)}

            {!isAuth && (<>
                <div className="optionsLogin">
                    <a className="btn" onClick={() => {}}>Войти</a>
                    <a className="btn" onClick={() => {}}><LoginIcon className="svgIcon"/></a>
                </div>
            </>)}

        </div>
    </>)
}