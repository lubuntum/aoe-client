import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx"

import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderMenu = ({onScrollToSection}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    
    return (<>
        {!isAuth && <>
            <nav className="headerUnauthNavbarContainer">
                {location.pathname === routes.HOME ?
                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Главная"}
                        buttonFunc={()=>{onScrollToSection("section0")}}/> :
                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Главная"}
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Преимущества"}
                        buttonFunc={()=>{onScrollToSection("section1")}}/>

                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Как начать учиться"}
                        buttonFunc={()=>{onScrollToSection("section2")}}/>

                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Пополнение баланса"}
                        buttonFunc={()=>{navigate(routes.PRICING)}}/>

                <Button buttonType={"link"} 
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Партнеры"}
                        buttonFunc={()=>{onScrollToSection("section4")}}/>

                <Button buttonType={"link"} 
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"FAQ"}
                        buttonFunc={()=>{onScrollToSection("section5")}}/>

                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""} 
                        buttonText={"Задания"}
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
            </nav>
        </>}

        {isAuth && <>
            <div className="headerAuthNavbarContainer">
                {(location.pathname !== routes.ACCOUNT && location.pathname !== routes.ADMIN) && <>
                    <div className="headerCollapseContainer">
                        <input type="checkbox" id="headerCollapseCheckbox"></input>
                        <label className="btn defaultBtn" style={{width: "100px"}} for="headerCollapseCheckbox"><MenuIcon className="defaultBtnSvg"/><span>Меню</span></label>

                        <nav>
                            <Button buttonType={"link"}
                                    buttonPadding={""}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={"Преимущества"}
                                    buttonFunc={()=>{onScrollToSection("section1")}}/>

                            <Button buttonType={"link"}
                                    buttonPadding={""}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""} 
                                    buttonText={"Как начать учиться"}
                                    buttonFunc={()=>{onScrollToSection("section2")}}/>

                            <Button buttonType={"link"}
									buttonPadding={""}
									buttonWidth={""}
									buttonHeight={""}
									buttonIcon={""}
                                    buttonText={"Партнеры"}
                                    buttonFunc={()=>{onScrollToSection("section4")}}/>

                            <Button buttonType={"link"}
									buttonPadding={""}
									buttonWidth={""}
									buttonHeight={""}
									buttonIcon={""}
                                    buttonText={"FAQ"}
                                    buttonFunc={()=>{onScrollToSection("section5")}}/>
                        </nav>
                    </div>
                </>}
            </div>
            <nav className="headerAuthNavbarImportantContainer">
                {location.pathname === routes.HOME ?
                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Главная"}
                        buttonFunc={()=>{onScrollToSection("section0")}}/> :
                <Button buttonType={"link"}
                        buttonPadding={""}
                        buttonWidth={""}
                        buttonHeight={""}
                        buttonIcon={""}
                        buttonText={"Главная"}
                        buttonFunc={()=>{navigate(routes.HOME)}}/>}

                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Пополнение баланса"} 
                        buttonFunc={()=>{navigate(routes.PRICING)}}/>

                <Button buttonType={"link"}
						buttonPadding={""}
						buttonWidth={""}
						buttonHeight={""}
						buttonIcon={""}
                        buttonText={"Задания"}
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
            </nav>
        </>}
    </>)
}