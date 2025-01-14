import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { useLocation } from "react-router-dom"
import { useNavigate } from "react-router-dom"

import routes from '../../routes'

import { Button } from "../reusible_components/Button"

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderBurger = ({headerData, onScrollToSection}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const buttonsBurgerContainer = [
        {text: "Главная", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section0") : ()=>navigate(routes.HOME)},
        {text: "Преимущества", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section1") : ()=>navigate(routes.HOME)},
        {text: "Как начать учиться", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section2") : ()=>navigate(routes.HOME)},
        {text: "Пополнение баланса", func: ()=>navigate(routes.PRICING)},
        {text: "Партнеры", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section4") : ()=>navigate(routes.HOME)},
        {text: "FAQ", func: location.pathname === routes.HOME ? ()=>onScrollToSection("section5") : ()=>navigate(routes.HOME)},
        {text: "Задания", func: ()=>navigate(routes.TASK)},
        {text: "Личный кабинет", func: ()=>navigate(routes.ACCOUNT)},
        {text: "Кабинет админа", func: ()=>navigate(routes.ADMIN)},
    ]

    return (<>
        <div className="headerBurgerContainer">
            <input type="checkbox" id="headerBurgerCheckbox"></input>
            <label className="btn defaultBtn" style={{width: "40px"}} for="headerBurgerCheckbox"><MenuIcon className="defaultBtnSvg"/></label>

            <nav>
                {location.pathname === routes.HOME ?
                <Button buttonType={"link"}
                        buttonText={"Главная"}
                        buttonFunc={()=>{onScrollToSection("section0")}}/> :
                <Button buttonType={"link"}
                        buttonText={"Главная"}
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                {(location.pathname !== routes.ACCOUNT && location.pathname === routes.HOME) ?
                <Button buttonType={"link"}
                        buttonText={"Преимущества"} 
                        buttonFunc={()=>{onScrollToSection("section1")}}/> :
		<Button buttonType={"link"}
                        buttonText={"Преимущества"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                {(location.pathname !== routes.ACCOUNT && location.pathname === routes.HOME) ?
                <Button buttonType={"link"}
                        buttonText={"Как начать учиться"} 
                        buttonFunc={()=>{onScrollToSection("section2")}}/> :
		<Button buttonType={"link"}
                        buttonText={"Как начать учиться"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                <Button buttonType={"link"}
                        buttonText={"Пополнение баланса"} 
                        buttonFunc={()=>{navigate(routes.PRICING)}}/>

                {(location.pathname !== routes.ACCOUNT && location.pathname === routes.HOME) ?
                <Button buttonType={"link"}
                        buttonText={"Партнеры"} 
                        buttonFunc={()=>{onScrollToSection("section4")}}/> :
		<Button buttonType={"link"}
                        buttonText={"Партнеры"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

		{(location.pathname !== routes.ACCOUNT && location.pathname === routes.HOME) ?
                <Button buttonType={"link"}
                        buttonText={"FAQ"} 
                        buttonFunc={()=>{onScrollToSection("section5")}}/> :
		<Button buttonType={"link"}
                        buttonText={"FAQ"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                <Button buttonType={"link"}
                        buttonText={"Задания"} 
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
                        
                {(isAuth && (location.pathname !== routes.ACCOUNT)) && 
                <Button buttonType={"link"}
                        buttonText={"Личный кабинет"} 
                        buttonFunc={()=>{navigate(routes.ACCOUNT)}}/>}
                
                {(isAuth && (headerData?.roles.includes("admin"))) &&
                <Button buttonType={"link"}
                        buttonText={"Кабинет админа"} 
                        buttonFunc={()=>{navigate(routes.ADMIN)}}/>}
            </nav>
        </div>
    </>)
}