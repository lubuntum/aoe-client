import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useLocation, useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx"

import routes from '../../routes'

import { ReactComponent as MenuIcon } from "../../res/icons/menu_24dp_gi.svg"

export const HeaderMenu = ({topFormat}) => {
    const {isAuth} = useAuth()
    const location = useLocation()
    const navigate = useNavigate()
    
    return (<>
        {!isAuth && <>
            <nav className="headerUnauthNavbarContainer">
                <Button buttonType={"link"} 
                        buttonText={"Главная"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>

                <Button buttonType={"link"} 
                        buttonText={"Преимущества"} />

                <Button buttonType={"link"} 
                        buttonText={"Как начать учиться"}/>

                <Button buttonType={"link"} 
                        buttonText={"Тарифы"} 
                        buttonFunc={()=>{navigate(routes.TARIFF)}}/>

                <Button buttonType={"link"} 
                        buttonText={"Партнеры"} />

                <Button buttonType={"link"} 
                        buttonText={"FAQ"}/>

                <Button buttonType={"link"} 
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

                        <nav className={`${topFormat ? 'headerCollapseTop120' : 'headerCollapseTop140'}`}>
                            <Button buttonType={"link"} 
                                    buttonText={"Преимущества"}/>

                            <Button buttonType={"link"} 
                                    buttonText={"Как начать учиться"}/>

                            <Button buttonType={"link"} 
                                    buttonText={"Отзывы"}/>

                            <Button buttonType={"link"} 
                                    buttonText={"Партнеры"}/>

                            <Button buttonType={"link"} 
                                    buttonText={"FAQ"}/>
                        </nav>
                    </div>
                </>}
            </div>
            <nav className="headerAuthNavbarImportantContainer">
                <Button buttonType={"link"} 
                        buttonText={"Главная"} 
                        buttonFunc={()=>{navigate(routes.HOME)}}/>

                <Button buttonType={"link"} 
                        buttonText={"Тарифы"} 
                        buttonFunc={()=>{navigate(routes.TARIFF)}}/>

                <Button buttonType={"link"} 
                        buttonText={"Задания"}
                        buttonFunc={()=>{navigate(routes.TASK)}}/>
            </nav>
        </>}
    </>)
}