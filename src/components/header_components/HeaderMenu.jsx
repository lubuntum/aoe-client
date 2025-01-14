import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx"

import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderMenu = ({onScrollToSection}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    const buttonsUnauthNavbarContainer = [
        {text : "Главная", func: location.pathname === routes.HOME ? ()=> onScrollToSection("section0"): ()=>navigate(routes.HOME)},
        {text: "Преимущества", func: ()=> {onScrollToSection("section1")}},
        {text: "Как начать учиться", func:()=>{onScrollToSection("section2")}},
        {text: "Пополнение баланса", func:()=>{navigate(routes.PRICING)}},
        {text: "Партнеры", func:()=>{onScrollToSection("section4")}},
        {text: "FAQ", func:()=>{onScrollToSection("section5")}},
        {text: "Задания", func:()=>{navigate(routes.TASK)}},
    ]
    return (<>
        {!isAuth && <>
            <nav className="headerUnauthNavbarContainer">
                {buttonsUnauthNavbarContainer.map((button, index) => (
                        <Button 
                            key={index}
                            buttonType={"link"}
                            buttonText={button.text}
                            buttonFunc={button.func}
                        />
                ))}
            </nav>
        </>}

        {isAuth && <>
            <div className="headerAuthNavbarContainer">
                {(location.pathname !== routes.ACCOUNT && location.pathname !== routes.ADMIN) && <>
                    <div className="headerCollapseContainer">
                        <input type="checkbox" id="headerCollapseCheckbox"></input>
                        <label className="btn defaultBtn" style={{width: "100px"}} for="headerCollapseCheckbox"><MenuIcon className="defaultBtnSvg"/><span>Меню</span></label>
                        <nav>
                        {location.pathname === routes.HOME ?
						<Button buttonType={"link"}
							buttonText={"Преимущества"}
							buttonFunc={()=>{onScrollToSection("section1")}}/> :
						<Button buttonType={"link"}
							buttonText={"Преимущества"}
							buttonFunc={()=>{navigate(routes.HOME)}}/>}

						{location.pathname === routes.HOME ?
						<Button buttonType={"link"}
							buttonText={"Как начать учиться"}
							buttonFunc={()=>{onScrollToSection("section2")}}/> :
						<Button buttonType={"link"}
							buttonText={"Как начать учиться"}
							buttonFunc={()=>{navigate(routes.HOME)}}/>}

						{location.pathname === routes.HOME ?
						<Button buttonType={"link"}
							buttonText={"Партнеры"}
							buttonFunc={()=>{onScrollToSection("section4")}}/> :
						<Button buttonType={"link"}
							buttonText={"Партнеры"}
							buttonFunc={()=>{navigate(routes.HOME)}}/>}

						{location.pathname === routes.HOME ?
						<Button buttonType={"link"}
							buttonText={"FAQ"}
							buttonFunc={()=>{onScrollToSection("section5")}}/> :
						<Button buttonType={"link"}
							buttonText={"FAQ"}
							buttonFunc={()=>{navigate(routes.HOME)}}/>}
                        </nav>
                    </div>
                </>}
            </div>
            <nav className="headerAuthNavbarImportantContainer">
                {location.pathname === routes.HOME ?
                <Button buttonType={"link"}
                        buttonText={"Главная"}
                        buttonFunc={()=>{onScrollToSection("section0")}}/> :
                <Button buttonType={"link"}
                        buttonText={"Главная"}
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                <Button buttonType={"link"}
                        buttonText={"Пополнение баланса"} 
                        buttonFunc={()=>{navigate(routes.PRICING)}}/>

                <Button buttonType={"link"}
                        buttonText={"Задания"}
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
            </nav>
        </>}
    </>)
}