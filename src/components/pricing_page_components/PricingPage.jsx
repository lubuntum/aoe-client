import "./css/pricing.css"

import baseBackground from "../../res/images/base_subscription_background.png"
import proBackground from "../../res/images/pro_subscription_background.png"
import paymentBackground from "../../res/images/payment_balance_backgorund.png"

import { HeaderMain } from "../header_components/HeaderMain"
import { PricingSubscriptionCard } from "./PricingSubscriptionCard"
import { PricingBalanceCard } from "./PricingBalanceCard"

import { PageTitle } from "../reusible_components/PageTitle"
import { Tooltip } from "../reusible_components/Tooltip"

export const PricingPage = () => {
    const proPricing = ["150₽ / 1 мес.", "300₽ / 2 мес.", "600₽ / 4 мес.", "800₽ / 6 мес.", "1250₽ / 9 мес."]
    const paymentPricing = ["50₽", "100₽", "200₽", "300₽", "600₽", "1200₽"]

    const baseDescription = ["План доступен после регистрации", 
                             "Моментальный доступ к 5 вариантам", 
                             "Хранение результатов в течении 24 часов"]

    const proDescription = ["Моментальный доступ ко всем 50+ вариантам", 
                            "Хранение результатов пока активна подписка", 
                            "Приветственный баланс на 1 проверку"]

    const paymentDescription = ["Срок действия баланса - 270 дней",
                                <p><Tooltip tooltipText={"Экспрес проверка осуществляется индийскими экстрасенсами под героином"}/> Экспресс проверка 1 задания: 50₽</p>,
                                <p><Tooltip tooltipText={"Экспрес проверка осуществляется индийскими экстрасенсами под героином"}/> Экспресс проверка 1 экзамена: 200₽</p>,
                                <p><Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/> Экспертная проверка 1 экзамена: 400₽</p>]

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
                                                 subscriptionDescription={baseDescription}
                                                 subscriptionIsActive={"Активен"}
                                                 subscriptionBG={baseBackground}/>

                        <PricingSubscriptionCard className={"pricingGridItem3"} 
                                                 contentSwap={true}
                                                 subscriptionType={"pro"}
                                                 subscriptionName={"Улучшеный план"}
                                                 subscriptionDescription={proDescription}
                                                 subscriptionIsActive={"Активен"}
                                                 subscriptionBG={proBackground}
                                                 subscriptionPricing={proPricing}/>

                        <PageTitle pageTitleText={"Пополнить баланс"} className={"pricingGridItem4"}/>

                        <PricingBalanceCard className={"pricingGridItem5"}
                                            paymentBG={paymentBackground}
                                            paymentPricing={paymentPricing}
                                            paymentDescription={paymentDescription}/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}