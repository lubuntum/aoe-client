import "./css/new_pricing.css"
import "./css/pricing_popup.css"
import "./css/pricing_media.css"

import { useMemo } from "react"

import { HeaderMain } from "../header_components/HeaderMain"
import { PageTitle } from "../reusible_components/PageTitle"
import { PricingBalance } from "./PricingBalance"
import { PricingSubBase } from "./PricingSubBase"
import { PricingSubPro } from "./PricingSubPro"
import { PricingSubProLoading } from "./PricingSubProLoading"
import { Popup } from "../reusible_components/Popup"
import { FooterMain } from "../footer_components/FooterMain"

import { useEffect, useRef, useState } from "react"
import { getAllValidSubscriptionTypes } from "../../modules/api_modules/subscriptionAPI"

export const PricingPage = () => {
    const subscriptionTypesRef = useRef(null)
    const [showPopup, setShowPopup] = useState(false)
    const [contentPopup, setContentPopup] = useState()
    const [subscriptionTypesDesc, setSubscriptionTypesDesc] = useState(null)
    const [updateHeaderData, setUpdateHeaderData] = useState(false)

    const pricingSubBaseDesc = useMemo(() => [
        "Базовый план доступен после регистрации", 
        "Моментальный доступ к 5 вариантам для прохождения", 
        "Хранение результатов в течении 24 часов"
    ], [])

    const pricingSubProDesc = useMemo(() => [
        "Моментальный доступ ко всем вариантам", 
        "Приветственный баланс на 1 экспресс проверку",
        "Хранение результатов пока активна подписка"
    ], [])

    useEffect(() => {
        {document.body.style.overflow = showPopup ? "hidden" : "auto"}
        return () => {
            document.body.style.overflow = "auto"
        }
    }, [showPopup])

    useEffect(()=>{
        getAllValidSubscriptionsRequest()
    }, [])

    const getAllValidSubscriptionsRequest = async () => {
        try {
            const response = await getAllValidSubscriptionTypes()
            subscriptionTypesRef.current = response.data.sort((a, b) => a.price - b.price)
            setSubscriptionTypesDesc(subscriptionTypesRef.current.map(s=>`${s.price}₽ / ${s.monthsCount} мес.`))
        } catch (err){
            console.error("Failed to load valid subscription types", err)
        }
    }
    return (<>
        <HeaderMain updateData={updateHeaderData} setUpdateData={setUpdateHeaderData}/>
        {showPopup && <Popup component={contentPopup} setShowPopup={setShowPopup}/>}
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className="pricingWrapper">
                    <div className="pricingGrid">
                        <PageTitle pageTitleText={"Пополнить #баланс# / Приобрести #подписку#"} className={"pricingGridItem1"}/>

                        <PricingBalance className={"pricingGridItem2"}/>

                        <PricingSubBase className={"pricingGridItem3"}
                                        pricingSubDesc={pricingSubBaseDesc}/>

                        {subscriptionTypesDesc ? 
                        <PricingSubPro className={"pricingGridItem4"}
                                       pricingSubDesc={pricingSubProDesc}
                                       subscriptionTypesDesc={subscriptionTypesDesc}
                                       subscriptionTypesRef={subscriptionTypesRef}
                                       setUpdateHeaderData={setUpdateHeaderData}
                                       setContentPopup={setContentPopup}
                                       setShowPopup={setShowPopup}/> : 
                        <PricingSubProLoading className={"pricingGridItem4"}/>}
                    </div>
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}