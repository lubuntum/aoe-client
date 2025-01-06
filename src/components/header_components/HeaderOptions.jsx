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
    let remainingBalance = undefined;
    if (headerData !== undefined) {
        remainingBalance = headerData.attemptsExpert
    }
    
    return (<>
        <div className="headerOptionsContainer">
            {isAuth && (<>
                {headerData === undefined ? loadingBalance : <>
                    <Button buttonPadding={"0 1.25rem"}
                            buttonText={`Баланс: ${remainingBalance} ₽`} 
                            buttonFunc={()=>{navigate(routes.TARIFF)}}/>
                </>}
                {headerData === undefined ? loadingName : <>
                    <Button buttonType={"link"} 
                            buttonText={getEmail()} 
                            buttonFunc={()=>{navigate(routes.ACCOUNT)}}/>
                </>}
                {headerData?.roles.includes("admin") && 
                    <Button buttonType={"admin"} 
                            buttonText={<AdminIcon className={"svgIcon"}/>} 
                            buttonFunc={()=>{navigate(routes.ADMIN)}}/>}
                
                <Button buttonText={<LogoutIcon className={"svgIcon"}/>} 
                        buttonFunc={()=>{logout()}}/>
            </>)}

            {!isAuth && (<>
                <div className="optionsLoginContainer">
                    <Button buttonPadding={"0 1.25rem"}
                            buttonText={"Войти"} 
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>

                    <Button buttonText={<LoginIcon className={"svgIcon"}/>} 
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>
                </div>
            </>)}
        </div>
    </>)
}