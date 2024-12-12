import "../../App.css"
import "./css/admin.css"

import { ReactComponent as SettingsIcon } from "../../res/icons/manufacturing_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { Header } from "../header/Header"
import { AdminTitle } from "./AdminTitle"
import { AdminVariants } from "./admin_variants/AdminVariants"
import { AdminPrompts } from "./admin_prompts/AdminPrompts"
import { AdminServices } from "./admin_services/AdminServices"
import { AdminTariffs } from "./admin_tariffs/AdminTariffs"

import { PopupContainer } from "../popup/PopupContainer"
import { AdminPopupAddVariant } from "./admin_variants/popup/AdminPopupAddVariant"

import { useEffect, useState } from "react"

export const AdminPage = () => {
    const [currentContent, setCurrentContent] = useState(1)
    const [showPopup, setShowPopup] = useState(false)

    useEffect(() => {
        {showPopup ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"}
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [showPopup])

    const AdminContentComponents = {
        1:{component: AdminVariants, title: "Варианты", props: {setShowPopup}, popupContent: AdminPopupAddVariant},
        2:{component: AdminPrompts, title: "Промпты"},
        3:{component: AdminServices, title: "Сервисы API"},
        4:{component: AdminTariffs, title: "Тарифы"},
    }

    const CurrentComponent = AdminContentComponents[currentContent]

    const adminBtnsNames = ["Варианты", "Промпты", "Сервисы", "Тарифы"]

    //TODO: <PopupContainer component = {CurrentComponent.popup}/>
    return (<>
        {showPopup && <PopupContainer component = {CurrentComponent.popupContent} setShowPopup = {setShowPopup}/>}
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="adminWrapper">
                    <Header/>
                    <div className="adminContainer">
                        <div className="adminSettings">
                            <AdminTitle curerntContentTitle = {CurrentComponent.title}/>
                            <div className="adminBtns">
                                {adminBtnsNames.map((btnName, index) => (
                                    <a className="defBtn" style={{width: "180px", height: "100%"}} onClick={() => setCurrentContent(index + 1)}><SettingsIcon className="defBtnSvg"/><span>{btnName}</span></a>
                                ))}
                            </div>
                        </div>
                        {CurrentComponent.component ? <CurrentComponent.component {...CurrentComponent.props}/> : <div>Component not found</div>}
                    </div>
                </div>
            </div>
        </div> 
    </>)
}