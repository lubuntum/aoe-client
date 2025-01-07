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
                    <Button buttonType={""}
                            buttonPadding={"0 20px"}
                            buttonWidth={""}
                            buttonHeight={""}
                            buttonIcon={""}
                            buttonText={`Баланс: ${remainingBalance} ₽`} 
                            buttonFunc={()=>{navigate(routes.PRICING)}}/>
                </>}
                {headerData === undefined ? loadingName : <>
                    <Button buttonType={"link"}
                            buttonPadding={""}
                            buttonWidth={""}
                            buttonHeight={""}
                            buttonIcon={""}
                            buttonText={getEmail()} 
                            buttonFunc={()=>{navigate(routes.ACCOUNT)}}/>
                </>}
                {headerData?.roles.includes("admin") && 
                    <Button buttonType={"admin"}
                            buttonPadding={""}
                            buttonWidth={""}
                            buttonHeight={""}
                            buttonIcon={<AdminIcon className={"svgIcon"}/>}
                            buttonText={""} 
                            buttonFunc={()=>{navigate(routes.ADMIN)}}/>}
                
                <Button buttonType={""}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={<LogoutIcon className={"svgIcon"}/>}
                        buttonText={""} 
                        buttonFunc={()=>{logout()}}/>
            </>)}

            {!isAuth && (<>
                <div className="optionsLoginContainer">
                    <Button buttonType={""}
                            buttonPadding={"0 20px"}
                            buttonWidth={""}
                            buttonHeight={""}
                            buttonIcon={""}
                            buttonText={"Войти"} 
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>

                    <Button buttonType={""}
                            buttonPadding={"0 20px"}
                            buttonWidth={""}
                            buttonHeight={""}
                            buttonIcon={<LoginIcon className={"svgIcon"}/>}
                            buttonText={""} 
                            buttonFunc={()=>{navigate(routes.AUTORIZATION)}}/>
                </div>
            </>)}
        </div>
    </>)
}