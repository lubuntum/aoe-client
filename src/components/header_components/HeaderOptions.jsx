import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx"

import { Loader } from "../reusible_components/Loader.jsx"

import routes from "../../routes.js"

import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_gi.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_gi.svg"
import { ReactComponent as AdminIcon } from "../../res/icons/admin_24dp_gi.svg"

export const HeaderOptions = ({headerData}) => {
    const {logout, isAuth, getEmail} = useAuth()
    const navigate = useNavigate()

    let loadingBalance = <Loader/>
    let loadingName = <Loader/>
    
    return (<>
        <div className="headerOptionsContainer">
            {isAuth && (<>
                {headerData === undefined ? loadingBalance : <>
                    <Button buttonType={"balance"}
                            buttonPadding={"0 20px"}
                            buttonText={`Баланс: ${headerData.currentBalance ? headerData.currentBalance : 0} ₽`} 
                            buttonFunc={()=>{navigate(routes.PRICING)}}/>
                </>}
                {headerData === undefined ? loadingName : <>
                    <Button buttonType={"link"}
                            buttonText={getEmail()} 
                            buttonFunc={()=>{navigate(routes.ACCOUNT)}}/>
                </>}
                {headerData?.roles.includes("admin") && 
                    <Button buttonType={"admin"}
                            buttonIcon={<AdminIcon className={"svgIcon"}/>}
                            buttonFunc={()=>{navigate(routes.ADMIN)}}/>}
                
                <Button buttonIcon={<LogoutIcon className={"svgIcon"}/>}
                        buttonFunc={()=>{logout()}}/>
            </>)}

            {!isAuth && (<>
                <div className="optionsLoginContainer">
                    <Button buttonPadding={"0 20px"}
                            buttonText={"Войти"} 
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>

                    <Button buttonPadding={"0 20px"}
                            buttonIcon={<LoginIcon className={"svgIcon"}/>}
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>
                </div>
            </>)}
        </div>
    </>)
}