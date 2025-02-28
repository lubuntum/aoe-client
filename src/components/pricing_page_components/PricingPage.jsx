import "./css/pricing.css"
import "./css/new_pricing.css"
import "./css/pricing_popup.css"

import { useMemo } from "react"

import baseBackground from "../../res/images/base_subscription_background.png"
import proBackground from "../../res/images/pro_subscription_background.png"
import paymentBackground from "../../res/images/payment_balance_backgorund.png"

import { HeaderMain } from "../header_components/HeaderMain"
import { PricingBalance } from "./PricingBalance"
import { PricingSubBase } from "./PrcingSubBase"
import { PricingSubPro } from "./PrcingSubPro"
import { PricingSubProLoading } from "./PricingSubProLoading"
import { Popup } from "../reusible_components/Popup"
import { PricingSubscriptionCard } from "./PricingSubscriptionCard"
import { PricingBalanceCard } from "./PricingBalanceCard"
import { FooterMain } from "../footer_components/FooterMain"

import { PageTitle } from "../reusible_components/PageTitle"
import { Tooltip } from "../reusible_components/Tooltip"
import { useEffect, useRef, useState } from "react"
import { getAllValidSubscriptionTypes } from "../../modules/api_modules/subscriptionAPI"

export const PricingPage = () => {
    const subscriptionTypesRef = useRef(null)
    const [showPopup, setShowPopup] = useState(false)
    const [contentPopup, setContentPopup] = useState()
    const proPricing = ["150₽ / 1 мес.", "300₽ / 2 мес.", "600₽ / 4 мес.", "800₽ / 6 мес.", "1250₽ / 9 мес."]
    const paymentPricing = ["50₽", "100₽", "200₽", "300₽", "600₽", "1200₽"]
    const [subscriptionTypesDesc, setSubscriptionTypesDesc] = useState(null)
    const [updateHeaderData, setUpdateHeaderData] = useState(false)
    const [error, setError] = useState(null)
    const baseDescription = useMemo(() => [
        "План доступен после регистрации", 
        "Моментальный доступ к 5 вариантам", 
        "Хранение результатов в течении 24 часов"
    ], []);

    const proDescription = useMemo(() => [
        "Моментальный доступ ко всем 50+ вариантам", 
        "Хранение результатов пока активна подписка"
    ], []);

    const paymentDescription = ["Срок действия баланса - 270 дней",
        <p><Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/> Экспресс проверка 1 задания: 50₽</p>,
        <p><Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/> Экспресс проверка 1 экзамена: 200₽</p>,
        <p><Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/> Экспертная проверка 1 экзамена: 700₽</p>]

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
        } catch(e){
            console.log(e)
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

                        {/*<PricingSubscriptionCard className={"pricingGridItem2"} 
                                                 contentSwap={false}
                                                 subscriptionType={"base"}
                                                 subscriptionName={"Базовый план"}
                                                 subscriptionDescription={baseDescription}
                                                 subscriptionIsActive={"Активен"}
                                                 subscriptionBG={baseBackground}/>
                        {subscriptionTypesDesc ? 
                        <PricingSubscriptionCard className={"pricingGridItem3"} 
                                                 contentSwap={true}
                                                 subscriptionType={"pro"}
                                                 subscriptionName={"Улучшеный план"}
                                                 subscriptionDescription={proDescription}
                                                 subscriptionIsActive={"Активен"}
                                                 subscriptionBG={proBackground}
                                                 subscriptionTypesDesc={subscriptionTypesDesc}
                                                 subscriptionTypesRef={subscriptionTypesRef}
                                                 setError = {setError}
                                                 setUpdateHeaderData={setUpdateHeaderData}/> : 
                                                 <p>loading...</p>}
 
                        <PageTitle pageTitleText={"Пополнить #баланс#"} className={"pricingGridItem4"}/>

                        <PricingBalanceCard className={"pricingGridItem8"}
                                            paymentBG={paymentBackground}
                                            paymentPricing={paymentPricing}
                                            paymentDescription={paymentDescription}/>*/}
                    </div>
                </div>
            </div>
        </div>
        <FooterMain/>
    </>)
}