import { useMemo } from "react"

import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useNavigate } from "react-router-dom"
import { Button } from "../reusible_components/Button.jsx"
import { Loader } from "../reusible_components/Loader.jsx"
import routes from "../../routes.js"

import { ReactComponent as LogoutIcon } from "../../res/icons/logout_24dp_gi.svg"
import { ReactComponent as LoginIcon } from "../../res/icons/login_24dp_gi.svg"
import { ReactComponent as AdminIcon } from "../../res/icons/admin_24dp_gi.svg"

export const HeaderOptions = ({headerData}) => {
    const { logout, isAuth } = useAuth()
    const navigate = useNavigate()

    const buttonsOptionsContainer = useMemo(() => [
        {text: "Личный кабинет", type: "link", padding: "", icon: "", func: ()=>navigate(routes.ACCOUNT)},
    ], [navigate])

    const buttonsOptionsLoginContainer = useMemo(() => [
        {text: "Войти", padding: "0 20px", icon: "", func: ()=>navigate(routes.AUTORIZATION)},
        {text: "", padding: "", icon: <LoginIcon className={"svgIcon"}/>, func: ()=>navigate(routes.AUTORIZATION)}
    ], [navigate])
    
    return (
        <div className="headerOptionsContainer">
            {isAuth ? (
                <>
                    {headerData ? (
                        <>
                            <Button key={`headerBalance0`}
                                    buttonText={`Баланс: ${headerData.currentBalance || 0} ₽`}
                                    buttonType={"balance"}
                                    buttonPadding="0 20px"
                                    buttonFunc={() => navigate(routes.PRICING)}/>
                            
                            {buttonsOptionsContainer.map((item, index) => (
                                <Button key={`headerOptionsLogin${index}`}
                                        buttonType={item.type}
                                        buttonPadding={item.padding}
                                        buttonText={item.text}
                                        buttonIcon={item.icon}
                                        buttonFunc={item.func}/>
                            ))}
                            {headerData.roles?.includes("partner") && <Button buttonType="link" buttonPadding="15px" buttonText={"Partner"}/>}
                            {headerData.roles?.includes("admin") && <Button buttonType="admin" buttonIcon={<AdminIcon className={"svgIcon"}/>} buttonFunc={()=>navigate(routes.ADMIN)}/>}
                        </>
                    ) : <Loader/>
                    }
                    <Button key={`logout0`}
                            buttonIcon={<LogoutIcon className={"svgIcon"}/>}
                            buttonFunc={logout}/>
                </>
            ) : (
                <div className="optionsLoginContainer">
                    {buttonsOptionsLoginContainer.map((item, index) => (
                        <Button key={`headerOptionLogout${index}`}
                                buttonPadding={item.padding}
                                buttonText={item.text}
                                buttonIcon={item.icon}
                                buttonFunc={item.func}/>
                    ))}
                </div>
            )
            }
        </div>
    )
}