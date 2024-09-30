import { useAuth } from "../../modules/auth/AuthProvider"
import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const Options = () => {
    const {logout, isAuth, getUsername} = useAuth()
    return (
    <div className="accWrapper">
        {!isAuth && (<>        
        <a className="btn loginBtn" style={{width:'150px', fontWeight: '500'}} onClick={{}}>Войти</a>
        <a className="btn hiddenLoginBtn" style={{display: 'none'}} onClick={{}}><LoginIcon className="svgIcon"/></a></>)}

        {isAuth && (<>
        <div className="divider"></div>
        <a className="btn tokenBtn" style={{width:'100px'}} onClick={{}}><BoltIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
        <a className="btn tokenBtn" style={{width:'100px'}} onClick={{}}><FaceIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
        <p className="userName">{getUsername()}</p>
        <div className="logoutBtnContainer">
            <a className="btn" onClick={()=>{logout()}}><LogoutIcon className="svgIcon"/></a>
        </div>
        </>)}
    </div>
    )
}