import "./css/privacy_police.css"

import { HeaderMain } from "../header_components/HeaderMain"
import { PageTitle } from "../reusible_components/PageTitle"
import { FooterMain } from "../footer_components/FooterMain"

export const PrivacyPolice = () => {
    return (<>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="privacyPoliceWrapper">
                    <PageTitle pageTitleText={"Политика #конфиденциальности#"}/>
                    
                    <div className="privacyPoliceContainer">
                        <div className="privacyPoliceText">

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}