import "./cabinet_style.css"
import "./cabinet_media_style.css"

import { Footer } from "../tme_footer/Footer"
import { Header } from "../tme_header/Header"
import { SectionUserAnswers } from "./SectionUserAnswers"
import { SectionUserInfo } from "./SectionUserInfo"

export const CabinetPage = () => {
    return (<>
        <Header/>

        <div className="content_wrapper">
            <SectionUserInfo/>

            <SectionUserAnswers/>
        </div>

        <Footer/>
    </>)
}