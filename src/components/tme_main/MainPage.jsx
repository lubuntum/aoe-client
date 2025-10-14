import "./main_style.css"
import "./main_media_style.css"

import { Header } from "../tme_header/Header.jsx"
import { SectionBanner } from "./SectionBanner.jsx"
import { SectionVideo } from "./SectionVideo.jsx"
import { SectionAdvantages } from "./SectionAdvantages.jsx"
import { SectionGuide } from "./SectionGuide.jsx"
import { SectionFaq } from "./SectionFaq.jsx"
import { Footer } from "../tme_footer/Footer.jsx"

export const MainPage = () => {
    return (<>
        <Header/>
        
        <div className="content_wrapper">
            <div className="main_page_wrapper">
                <SectionBanner/>

                <SectionAdvantages/>

                <SectionGuide/>

                <SectionFaq/>
            </div>
        </div>

        <Footer/>
    </>)
}