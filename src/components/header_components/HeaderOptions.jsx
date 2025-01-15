import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button.jsx"
import { Loader } from "../reusible_components/Loader.jsx"
import routes from "../../routes.js"
import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_gi.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_gi.svg"
import { ReactComponent as AdminIcon } from "../../res/icons/admin_24dp_gi.svg"

export const HeaderOptions = ({headerData}) => {
    const {logout, isAuth} = useAuth()
    const navigate = useNavigate()
    let loadingOptions = <Loader/>
    const buttonsOptionsContainer = [
        {text: "Личный кабинет", type: "link", padding: "", icon: "", func: ()=>{navigate(routes.ACCOUNT)}},
        {text: "", type: "admin", padding: "", icon: <AdminIcon className={"svgIcon"}/>, func: ()=>{navigate(routes.ADMIN)}},
    ]
    const buttonsOptionsLoginContainer = [
        {text: "Войти", padding: "0 20px", icon: "", func: ()=>{navigate(routes.AUTORIZATION)}},
        {text: "", padding: "0 20px", icon: <LoginIcon className={"svgIcon"}/>, func: ()=>{navigate(routes.AUTORIZATION)}},
    ]
    
    return (<>
        <div className="headerOptionsContainer">
            {isAuth && (<>
                {headerData === undefined ? loadingOptions : <>
                    <Button buttonText={`Баланс: ${headerData.currentBalance ? headerData.currentBalance : 0} ₽`}
                            buttonType={"balance"}
                            buttonPadding="0 20px"
                            buttonFunc={()=>{navigate(routes.PRICING)}}/>
                    {buttonsOptionsContainer.map((button, index) => (
                        <Button key={index} 
                                buttonType={button.type} 
                                buttonPadding={button.padding} 
                                buttonText={button.text} 
                                buttonIcon={button.icon} 
                                buttonFunc={button.func}/>
                    ))}
                </>}
                <Button key={"logout0"}
                        buttonIcon={<LogoutIcon className={"svgIcon"}/>}
                        buttonFunc={()=>{logout()}}/>
            </>)}

            {!isAuth && (<>
                <div className="optionsLoginContainer">
                    {buttonsOptionsLoginContainer.map((button, index) => (
                        <Button key={index} 
                                buttonPadding={button.padding} 
                                buttonIcon={button.icon} 
                                buttonFunc={button.func}
                                buttonText={button.text}/>
                    ))}
                </div>
            </>)}
        </div>
    </>)
}