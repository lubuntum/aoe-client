import React, { useMemo, useState, useEffect } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"

import { PricingSubBase } from "../../pricing_page_components/PricingSubBase"
import { PricingSubPro } from "../../pricing_page_components/PricingSubPro"

export const MainSubscriptionSection = React.memo(() => {
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

    return (
        <div className="contentWrapper">
            <div className='subscriptionAdvantagesWrapper'>
                <PageTitle pageTitleText={"Преимущества #улучшеной подписки#"}/>
                <div className="subscriptionAdvantagesContainer">
                    <PricingSubBase pricingSubDesc={pricingSubBaseDesc}/>
                    <PricingSubPro pricingSubDesc={pricingSubProDesc}/>
                </div>
            </div>
        </div>
    )
})