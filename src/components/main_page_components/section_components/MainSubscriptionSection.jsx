import React, { useMemo, useState, useEffect } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"

import { PricingSubscriptionCard } from "../../pricing_page_components/PricingSubscriptionCard"

import baseBackground from "../../../res/images/base_subscription_background.png"
import proBackground from "../../../res/images/pro_subscription_background.png"

export const MainSubscriptionSection = React.memo(() => {
    const [contentSwap, setContentSwap] = useState({base: false, pro: true})

    const mainSubscription =  useMemo(() => [
        {contentSwap: contentSwap.base, 
        subscriptionType: "base", 
        subscriptionName: "Базовый план",
        subscriptionDescription: ["План доступен после регистрации", 
                                  "Моментальный доступ к 5 вариантам", 
                                  "Хранение результатов в течении 24 часов"
                                ],
        subscriptionIsActive: "Активен",
        subscriptionBG: baseBackground
        },

        {contentSwap: contentSwap.pro, 
        subscriptionType: "pro", 
        subscriptionName: "Улучшеный план",
        subscriptionDescription: ["Моментальный доступ ко всем 50+ вариантам", 
                                  "Хранение результатов пока активна подписка", 
                                  "Приветственный баланс на 1 проверку"
                                ],
        subscriptionIsActive: "Активен",
        subscriptionBG: proBackground
        },
    ], [contentSwap])

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1200) {
                setContentSwap({ base: false, pro: false})
            } else {
                setContentSwap({ base: false, pro: true})
            }
        }
        handleResize()
        window.addEventListener("resize", handleResize)
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <div className="contentWrapper">
            <div className='subscriptionAdvantagesWrapper'>
                <PageTitle pageTitleText={"Преимущества #улучшеной подписки#"}/>
                <div className="subscriptionAdvantagesContainer">
                    {mainSubscription.map((item, index) => (
                        <PricingSubscriptionCard key={`subs${index}`}
                                                 contentSwap={item.contentSwap}
                                                 subscriptionType={item.subscriptionType}
                                                 subscriptionName={item.subscriptionName}
                                                 subscriptionDescription={item.subscriptionDescription}
                                                 subscriptionIsActive={item.subscriptionIsActive}
                                                 subscriptionBG={item.subscriptionBG}/>
                    ))}
                </div>
            </div>
        </div>
    )
})