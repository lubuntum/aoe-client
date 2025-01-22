import "./css/admin_page.css"

import { HeaderMain } from "../header_components/HeaderMain"
import { PageTitle } from "../reusible_components/PageTitle"

import { AdminVariants } from "./variants_components/AdminVariants"
import { AdminPrompts } from "./prompts_components/AdminPrompts"
import { AdminPricing } from "./pricing_components/AdminPricing"
import { AdminPartners } from "./partners_components/AdminPartners"

import { Popup } from "../reusible_components/Popup"
import { AdminVariantPopup } from "./variants_components/popup_components/AdminVariantPopup"

import { Button } from "../reusible_components/Button"

import { useEffect, useState } from "react"
import { validateAdmin } from "../../modules/validation_modules/adminValidation"

import { FooterMain } from "../footer_components/FooterMain"

import { ReactComponent as SettingsIcon } from "../../res/icons/manufacturing_24dp_gi.svg"
import { ReactComponent as PartnerIcon } from "../../res/icons/handshake_24dp_gi.svg"
import { useAuth } from "../../modules/auth_modules/AuthProvider"

export const AdminPage = () => {
    const [currentContent, setCurrentContent] = useState(1)
    const [showPopup, setShowPopup] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const {logout} = useAuth()
    useEffect(() => {
        {document.body.style.overflow = showPopup ? "hidden" : "auto"}
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [showPopup])

    useEffect(()=>{
        validate()
    },[])
    
    const validate = async () => {
        try {
            const response = await validateAdmin(localStorage.getItem("token"))
            setIsAdmin(response.data)
        } catch (e) {
            setIsAdmin(false)
            logout()
        }
        
    }
    const AdminContentComponents = {
        1:{component: AdminVariants, title: "Варианты", props: {setShowPopup}, popupContent: AdminVariantPopup},
        2:{component: AdminPartners, title: "Партнеры"},
        3:{component: AdminPrompts, title: "Промпты"},
        4:{component: AdminPricing, title: "Тарифы"},
    }

    const CurrentComponent = AdminContentComponents[currentContent]

    const adminBtns = [
        {name: "Варианты", icon: <SettingsIcon className="svgIcon"/>}, 
        {name: "Партнеры", icon: <PartnerIcon className="svgIcon"/>}, 
        {name: "Промпты", icon: <SettingsIcon className="svgIcon"/>}, 
        {name: "Финансы", icon: <SettingsIcon className="svgIcon"/>}]

    return (<>
        {!isAdmin ? <p>Not found 404</p> : <>
        <HeaderMain/>
        {showPopup && <Popup component = {CurrentComponent.popupContent} setShowPopup = {setShowPopup}/>}
            <div className="sectionWrapper">
                <div className="contentWrapper">
                    <div className="adminWrapper">
                        <div className="adminContainer">
                            <div className="adminSettings">
                                <PageTitle pageTitleText={CurrentComponent.title}/>
                                <div className="adminBtns">
                                    {adminBtns.map((btn, index) => (
                                        <Button buttonKey={index}
                                                buttonPadding={"0 1.25rem"}
                                                buttonHeight={"100%"}
                                                buttonIcon={btn.icon}
                                                buttonText={btn.name}
                                                buttonFunc={()=>setCurrentContent(index + 1)}/>
                                    ))}
                                </div>
                            </div>
                            {CurrentComponent.component ? <CurrentComponent.component {...CurrentComponent.props}/> : <div>Component not found</div>}
                        </div>
                    </div>
                </div>
            </div>
            <FooterMain/>
        </>}
    </>)
}