import "./css/autorization_page.css"
import "./css/login_registration.css"

import loginBackground from "../../res/images/login_background_image.jpg"

import { Login } from "./Login"
import { Registration } from "./Registration"
import { Error } from "./Error"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import routes from "../../routes"


export const AutorizationPage = () => {
    const navigate = useNavigate()

    const [panelToggle, setPanelToggle] = useState(true)
    const [disabledButton, setDisabledButton] = useState(false)

    const handleCreateAccount = () => {
        console.log(1)
        if (!disabledButton) {
            setPanelToggle(true)
            setButtonState()
        }
    }

    const handleLogin = () => {
        console.log(2)
        if (!disabledButton) {
            setPanelToggle(false)
            setButtonState()
        }
    }

    const setButtonState = () => {
        setDisabledButton(true)
        setTimeout(() => {
            setDisabledButton(false)
        }, 600)
    }

    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="autorizationWrapper">
                    <div className={`autorizationContainer ${panelToggle ? "panelToggleOn" : ""}`}>

                        <div className="loginContainer">
                            <Login toggle={handleLogin} disabledButton={disabledButton}/>
                        </div>

                        <div className="registrationContainer">
                            <Registration toggle={handleCreateAccount} setPanelToggle={setPanelToggle} disabledButton={disabledButton}/>
                        </div>

                        <div className="overlayContainer">
                            <div className="overlay">
                                <div className="overlayLeft">
                                    <div className="overlayImg">
                                        <div className="overlayBack" onClick={() => {navigate(routes.HOME)}}>
                                            <p>Назад</p>
                                        </div>
                                        <img src={loginBackground} alt=""/>
                                    </div>
                                </div>
                                <div className="overlayRight">
                                    <div className="overlayImg">
                                        <div className="overlayBack" onClick={() => {navigate(routes.HOME)}}>
                                            <p>Назад</p>
                                        </div>
                                        <img src="https://img.freepik.com/free-photo/closeup-vertical-shot-cat-cute-gray-kitten_181624-56769.jpg?t=st=1732878272~exp=1732881872~hmac=2ae5e9542dbe6a4e10eb884e2c903bc30ec0d67881b7a9db5a27a9a2f2a2d6a3&w=740" alt=""/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Error/>
            </div>
        </div>
    </>)
}