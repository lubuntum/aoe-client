import "./css/partner_page.css"
import "./css/partner_info.css"
import "./css/partner_form.css"
import "./css/partner_promocode.css"
import { useEffect, useRef, useState } from "react"
import { getAllPartnerTypes, getPartnerData, updatePartnerData } from "../../modules/api_modules/partnerAPI"
import { HeaderMain } from "../header_components/HeaderMain"
import { PageTitle } from "../reusible_components/PageTitle"
import { PartnerInfo } from "./PartnerInfo"
import { PartnerForm } from "./PartnerForm"
import { PartnerPromocode } from "./PartnerPromocode"
import { FooterMain } from "../footer_components/FooterMain"
import { DropdownList } from "../reusible_components/DropdownList"
import { Button } from "../reusible_components/Button"

export const PartnerPage = () => {
    const [partner, setPartner] = useState(null)

    const [partnerTypesText, setPartnerTypesText] = useState(null)
    const partnerTypesRef = useRef(null)

    const [error, setError] = useState(null)
    const [status, setStatus] = useState(null)
    useEffect(()=>{
        loadPartnerData()
    },[])

    const loadPartnerData = async () => {
        try {
            const response = await getPartnerData(localStorage.getItem("token"))
            await loadPartnerTypes()
            setPartner(response.data)
        } catch(e) {
            setError("Ошибка при загрузке данных")
        }
    }
    const loadPartnerTypes = async () => {
        const response = await getAllPartnerTypes(localStorage.getItem("token"))
        partnerTypesRef.current = response.data
        setPartnerTypesText(response.data.map(t=>t.type))
    }

    return (<>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="partnerWrapper">
                    <div className="partnerGrid">
                        <PageTitle pageTitleText={"Кабинет #партнера#"} className={"partnerGridItem1"}/>

                        <PartnerInfo className={"partnerGridItem2"} partner={partner}/>

                        <PartnerForm className={"partnerGridItem3"} partner={partner} setPartner = {setPartner}  partnerTypeText={partnerTypesText}/>

                        <PageTitle pageTitleText={"Текущие #промокоды#"} className={"partnerGridItem4"}/>

                        <PartnerPromocode className={"partnerGridItem5"} partner = {partner}/>

                    </div>
                    
                </div>
            </div>
        </div>
        
        <FooterMain/>
        </>)
}