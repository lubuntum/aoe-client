import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AdminIcon } from "../../res/icons/admin_panel_settings_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { useAuth } from "../../modules/auth/AuthProvider"
import { useNavigate } from "react-router-dom"

import routes from '../../routes'

import { setDigitsFormat } from "../../modules/digitsFormat/setDigitsFormat.js"

export const HeaderOptions = ({headerData}) => {
    const {logout, isAuth, getEmail} = useAuth()
    const navigate = useNavigate()

    let loadingTokens = <p>Анимация загрузки</p>
    let loadingName = <p>Анимация загрузки</p>
    let remainTokens = undefined;
    
    if (headerData !== undefined){
        remainTokens = setDigitsFormat(headerData.attemptsExpert)
    }
    
    return (<>
        <div className="headerOptionsContainer">
            {isAuth && (<>
                {headerData === undefined ? loadingTokens : <>
                    <a className="btn defaultBtn" style={{width: "100px"}}><FaceIcon className="defaultBtnSvg"/><span>{remainTokens}</span><AddIcon className="defaultBtnSvg"/></a>
                </>}
                {headerData === undefined ? loadingName : <>
                    <a className="linkBtn" onClick={()=>{navigate(routes.ACCOUNT)}}>{getEmail()}</a>
                </>}
                <a className="btn emphasisBtn" style={{width: "40px"}} onClick={() => {navigate(routes.ADMIN)}}><AdminIcon className="emphasisBtnSvg"/></a>
                
                <a className="btn defaultBtn" style={{width: "40px"}} onClick={() => {logout()}}><LogoutIcon className="defaultBtnSvg"/></a>
            </>)}

            {!isAuth && (<>
                <div className="optionsLoginContainer">
                    <a className="btn defaultBtn" style={{width: "150px"}} onClick={() => {navigate(routes.AUTORIZATION)}}><span>Войти</span></a>
                    <a className="btn defaultBtn" style={{width: "40px"}} onClick={() => {navigate(routes.AUTORIZATION)}}><LoginIcon className="defaultBtnSvg"/></a>
                </div>
            </>)}
        </div>
    </>)
}