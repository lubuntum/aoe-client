import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import routes from '../../routes'

import { Button } from "../reusible_components/Button"

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderBurger = () => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()

    return (<>
        <div className="headerBurgerContainer">
            <input type="checkbox" id="headerBurgerCheckbox"></input>
            <label className="btn defaultBtn" style={{width: "40px"}} for="headerBurgerCheckbox"><MenuIcon className="defaultBtnSvg"/></label>

            <nav>
                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Главная"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>

                {(location.pathname !== routes.ACCOUNT) &&
                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Преимущества"} 
                        buttonFunc={()=>{}}/>}

                {(location.pathname !== routes.ACCOUNT) &&
                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Как начать учиться"} 
                        buttonFunc={()=>{}}/>}

                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Пополнение баланса"} 
                        buttonFunc={()=>{navigate(routes.PRICING)}}/>

                {(location.pathname !== routes.ACCOUNT) &&
                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"FAQ"} 
                        buttonFunc={()=>{}}/>}

                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Задания"} 
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
                        
                {(isAuth && (location.pathname !== routes.ACCOUNT)) && 
                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Личный кабинет"} 
                        buttonFunc={()=>{navigate(routes.ACCOUNT)}}/>}
            </nav>
        </div>
    </>)
}