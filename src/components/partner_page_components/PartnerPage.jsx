import "./css/partner_page.css"
import { useEffect, useRef, useState } from "react"
import { getAllPartnerTypes, getPartnerData, updatePartnerData } from "../../modules/api_modules/partnerAPI"
import { HeaderMain } from "../header_components/HeaderMain"
import { FooterMain } from "../footer_components/FooterMain"
import { DropdownList } from "../reusible_components/DropdownList"
import { Button } from "../reusible_components/Button"

export const PartnerPage = () => {
    const partnerRef = useRef(null)

    const [partnerTypesText, setPartnerTypesText] = useState(null)
    const [pickedPartnerType, setPickedPartnerType] = useState(null)
    const partnerTypesRef = useRef(null)

    const [partnerName, setPartnerName] = useState('')
    const [partnerNumber, setPartnerNumber] = useState('')
    const [INN, setINN] = useState('')
    const [KPP, setKPP] = useState('')
    const [BIK, setBIK] = useState('')
    const [RS, setRS] = useState('')

    const [partnerships, setPartnerships] = useState(null)
    const [promocodeUsageCount, setPromocodeUsageCount] = useState(null)

    const [error, setError] = useState(null)
    useEffect(()=>{
        loadPartnerData()
    },[])

    const loadPartnerData = async () => {
        try {
            const response = await getPartnerData(localStorage.getItem("token"))
            await loadPartnerTypes()
            console.log(`Data = ${response.data}`)
            partnerRef.current = response.data
            console.log(response.data)
            setPartnerName(partnerRef.current.partnerName)
            setPartnerNumber(partnerRef.current.partnerNumber)
            setINN(partnerRef.current.inn)
            setKPP(partnerRef.current.kpp)
            setBIK(partnerRef.current.bik)
            setRS(partnerRef.current.rs)
            setPickedPartnerType(partnerRef.current.type)
            setPartnerships(response.data.partnerships)
            setPromocodeUsageCount(response.data.promocodeUsageCount)
        } catch(e) {
            setError(e.response.data.error)
        }
    }
    const loadPartnerTypes = async () => {
        const response = await getAllPartnerTypes(localStorage.getItem("token"))
        partnerTypesRef.current = response.data
        setPartnerTypesText(response.data.map(t=>t.type))
    }
    const handleSelectPartnerTypes = (event) => {
        console.log(event.target.value)
        setPickedPartnerType(partnerTypesRef.current[event.target.value].type)
    }
    const updatePartner = async () => {
        console.log(partnerRef.current)
        partnerRef.current.partnerName = partnerName
        partnerRef.current.partnerNumber = partnerNumber
        partnerRef.current.inn = INN
        partnerRef.current.kpp = KPP
        partnerRef.current.bik = BIK
        partnerRef.current.rs = RS
        partnerRef.current.type = pickedPartnerType
        updatePartnerData(localStorage.getItem("token"), partnerRef.current)
    }

    return(
        <>
        <HeaderMain/>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="partnerPage">
                    <div className="partnerWrapper">
                        <div className="partnerForm">
                            <input className="partnerInputTemp" type="text" value={partnerName} onChange={(e)=> {setPartnerName(e.target.value)}} placeholder="Наименование организации" />
                            
                            {partnerTypesText &&
                            <div>
                                <select value={pickedPartnerType ? pickedPartnerType : '' } className="partnerInputTemp" onChange={handleSelectPartnerTypes} id="typesSelect">
                                    <option value=""> {pickedPartnerType ? `Текущее : ${pickedPartnerType}` : "Выберите тип организации"} </option>
                                    {partnerTypesText.map((type, index)=> (
                                        <option key={index} value={index}>
                                            {type}
                                        </option>
                                    ))}
                                </select>    
                            </div>}
                            <input className="partnerInputTemp" type="text" value={partnerNumber} onChange={(e)=> {setPartnerNumber(e.target.value)}} placeholder="Номер телефона" />
                            <input className="partnerInputTemp" type="text" value={INN} onChange={(e)=> {setINN(e.target.value)}} placeholder="Банковский ИНН" />
                            <input className="partnerInputTemp" type="text" value={KPP} onChange={(e)=> {setKPP(e.target.value)}} placeholder="КПП" />
                            <input className="partnerInputTemp" type="text" value={BIK} onChange={(e)=> {setBIK(e.target.value)}} placeholder="БИК" />
                            <input className="partnerInputTemp" type="text" value={RS} onChange={(e)=> {setRS(e.target.value)}} placeholder="РС" />
                            <Button buttonText={"Сохранить"} buttonPadding="15px 10px" buttonFunc={updatePartner}/>
                        </div>
                        <div className="partnerInfo">
                            {promocodeUsageCount && <p style={{padding:"5px"}}>Активных подписчиков: {promocodeUsageCount}</p>}
                            {partnerships && 
                            partnerships.map((p, index) => (
                            <div className="partnership">
                                <p>Партнерская программа №{index+1}</p>
                                <p>Промокод : {p.promocode}</p>
                                <p>Доля от проверок: {(p.partnerRate*100).toFixed(0)}%</p>
                                <p>Скидка пользователям: { Number(p.discount*100).toFixed(0)}%</p>
                                <p>Дата выдачи: {p.contractDate}</p>
                            </div>
                            ))
                            }
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        
        <FooterMain/>
        </>
    )
}