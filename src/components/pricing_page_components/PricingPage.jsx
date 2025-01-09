import "./css/pricing.css"

import baseBackground from "../../res/images/base_subscription_background.png"
import proBackground from "../../res/images/pro_subscription_background.png"

import { HeaderMain } from "../header_components/HeaderMain"
import { PricingSubscriptionCard } from "./PricingSubscriptionCard"

import { PageTitle } from "../reusible_components/PageTitle"

export const PricingPage = () => {
    const baseDescription = ["План доступен после регистрации", 
                             "Моментальный доступ к 5 вариантам", 
                             "Хранение результатов в течении 24 часов"]
    const proDescription = ["Моментальный доступ ко всем 50+ вариантам", 
                            "Хранение результатов пока активна подписка", 
                            "Приветственный баланс на 1 проверку"]

    return (<>
        <div className='sectionWrapper'>
            <div className='contentWrapper'>
                <div className="pricingWrapper">
                    <HeaderMain/>
                    <div className="pricingGrid">
                        <PageTitle pageTitleText={"Приобрести подписку"} className={"pricingGridItem1"}/>

                        <PricingSubscriptionCard className={"pricingGridItem2"} 
                                                 contentSwap={false}
                                                 subscriptionType={"base"}
                                                 subscriptionName={"Базовый план"}
                                                 subscriptionDescription={""}
                                                 subscriptionIsActive={"Активен"}
                                                 subscriptionBG={baseBackground}/>

                        <PricingSubscriptionCard className={"pricingGridItem3"} 
                                                 contentSwap={true}
                                                 subscriptionType={"pro"}
                                                 subscriptionName={"Улучшеный план"}
                                                 subscriptionDescription={""}
                                                 subscriptionIsActive={""}
                                                 subscriptionBG={proBackground}/>

                        <PageTitle pageTitleText={"Пополнить баланс"} className={"pricingGridItem4"}/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}