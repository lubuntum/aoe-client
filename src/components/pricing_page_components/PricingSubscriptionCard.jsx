import React, { useCallback } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { useLocation } from "react-router-dom"

import routes from "../../routes"

export const PricingSubscriptionCard = ({className, 
                                         contentSwap, 
                                         subscriptionType, 
                                         subscriptionName, 
                                         subscriptionDescription, 
                                         subscriptionIsActive, 
                                         subscriptionBG,
                                         subscriptionTypesDesc,
                                         subscriptionTypesRef}) => {
    const location = useLocation()
    const handleSelect = (subscriptionTypesDesc, index) => {
        console.log(subscriptionTypesRef.current[index])
        //TODO send request for buying subscription for user (other stuff on the server side)
    }

    return (
        <div className={`pricngSubscriptionCardContainer ${className}`}>
            {subscriptionType === "base" ?
                <div className="pricingSubscriptionBackgorund" style={{backgroundImage: `url(${subscriptionBG})`}}></div> : 
                <div className="pricingSubscriptionBackgorund" style={{backgroundImage: `url(${subscriptionBG})`, transform: contentSwap ? "none" : "scaleX(-1)"}}></div>}
            <div className="pricingSubscriptionCardContent">
                <div className={`pricingSubscriptionCardName ${contentSwap ? "contentSwapName" : ""}`}>
                    <p>{subscriptionName}</p>
                    <p>{subscriptionIsActive}</p>
                </div>
                <div className={`pricingSubscriptionCardDescription ${contentSwap ? "contentSwapDescription" : ""}`}>
                    {subscriptionDescription.map((description, index) => (
                        <div className="cardDescriptionItem">
                            <div className={`cardDescriptionBorder ${contentSwap ? "contentSwapBorder" : ""}`}></div>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
                {location.pathname !== routes.HOME && (
                <div className={`pricingSubscriptionOptions ${contentSwap === false ? "" : "contentSwapOptions"}`}>
                    {subscriptionType === "base" ? (
                        <div className="subscriptionOptionsEmpty">
                            <p>Бесплатно</p>
                        </div> ) : (
                        <div className="subscriptionOptions">
                            {subscriptionTypesDesc && <DropdownList options={subscriptionTypesDesc} onSelect={handleSelect}/>}
                            <Button buttonType={"alt"}
                                    buttonPadding={"0 20px"}
                                    buttonText={"Приобрести"}
                                    />
                        </div>)}
                </div>)}
            </div>
        </div>
    )
}