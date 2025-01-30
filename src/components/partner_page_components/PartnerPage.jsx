import "./css/partner_page.css"
import { useEffect, useRef, useState } from "react"
import { getAllPartnerTypes, getPartnerData } from "../../modules/api_modules/partnerAPI"
import { HeaderMain } from "../header_components/HeaderMain"
import { FooterMain } from "../footer_components/FooterMain"
import { DropdownList } from "../reusible_components/DropdownList"
import { Button } from "../reusible_components/Button"

export const PartnerPage = () => {
    const [partner, setPartner] = useState(null)

    const [partnerTypesText, setPartnerTypesText] = useState(null)
    const pickedPartnerTypeRef = useRef(null)
    const partnerTypesRef = useRef(null)

    const [error, setError] = useState(null)
    useEffect(()=>{
        loadPartnerData()
    },[])

    const loadPartnerData = async () => {
        try {
            const response = await getPartnerData(localStorage.getItem("token"))
            await loadPartnerTypes()
            setPartner(response.data)
        } catch(e) {
            setError(e.response.data.error)
        }
    }
    const loadPartnerTypes = async () => {
        const response = await getAllPartnerTypes(localStorage.getItem("token"))
        partnerTypesRef.current = response.data
        setPartnerTypesText(response.data.map(t=>t.type))
    }
    const handleSelectPartnerTypes = (type, index) => {
        pickedPartnerTypeRef.current = partnerTypesRef.current[index]
    }

    return(
        <>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="partnerPage">
                    <div className="partnerWrapper">
                        <input className="partnerInputTemp" type="text" value={partner?.partnerName} placeholder="Наименование организации" />
                        {partnerTypesText && <DropdownList onSelect={handleSelectPartnerTypes} options={partnerTypesText} />}
                        <input className="partnerInputTemp" type="text" value={partner?.partnerNumber} placeholder="Номер телефона" />
                        <input className="partnerInputTemp" type="text" value={partner?.INN} placeholder="Банковский ИНН" />
                        <input className="partnerInputTemp" type="text" value={partner?.KPP} placeholder="КПП" />
                        <input className="partnerInputTemp" type="text" value={partner?.BIK} placeholder="БИК" />
                        <input className="partnerInputTemp" type="text" value={partner?.RS} placeholder="РС" />
                        <Button buttonText={"Сохранить"} buttonPadding="0px 10px" buttonFunc={()=>{}}/>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <FooterMain/>
        </>
    )
}