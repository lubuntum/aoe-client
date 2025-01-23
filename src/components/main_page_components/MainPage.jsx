import "../../App.css"
import "./css/main.css"
import "./css/main_banner.css"
import "./css/main_adv.css"
import "./css/main_uses.css"
import "./css/main_subs.css"
import "./css/main_faq.css"
import "./css/main_media.css"

import { HeaderMain } from '../header_components/HeaderMain'
import { MainBannerSection } from "./section_components/MainBannerSection"
import { MainAdvantagesSection } from "./section_components/MainAdvantagesSection"
import { MainUsesSection } from "./section_components/MainUsesSection"
import { MainSubscriptionSection } from "./section_components/MainSubscriptionSection"
import { MainFAQSection } from "./section_components/MainFAQSection"
import { MainPartnerSection } from "./section_components/MainPartnerSection"
import { FooterMain } from "../footer_components/FooterMain"
import { useCallback } from "react"

export const MainPage = () => {
    const scrollToSection = useCallback((sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            const offset = sectionId === "section0" ? 20 : 0
            const sectionTop = section.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: sectionTop - offset,
                behavior: "smooth"
            })
        }
    }, [])

    const mainSections = [
        {id: "section0", component: <MainBannerSection/>},
        {id: "section1", component: <MainAdvantagesSection/>},
        {id: "section2", component: <MainUsesSection/>},
        {id: "section3", component: <MainSubscriptionSection/>},
        {id: "section4", component: <MainPartnerSection/>},
        {id: "section5", component: <MainFAQSection/>},
    ]

    return (<>
        <HeaderMain onScrollToSection={scrollToSection}/>
        <div className="mainContentContainer">
            {mainSections.map((item, index) => (
                <section key={`mainSection${index}`} id={item.id} className="sectionWrapper">
                    {item.component}
                </section>
            ))}
        </div>
        <FooterMain onScrollToSection={scrollToSection}/>
    </>)
}