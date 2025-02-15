import React, { useCallback, useState } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { useLocation, useNavigate } from "react-router-dom"

import routes from "../../routes"
import { purchaseSubscription } from "../../modules/api_modules/subscriptionAPI"
const STATUSES = {
    IDLE: "IDLE",
    SUCCESS: "SUCCESS"
}
export const PricingSubscriptionCard = ({className, 
                                         contentSwap, 
                                         subscriptionType, 
                                         subscriptionName, 
                                         subscriptionDescription, 
                                         subscriptionIsActive, 
                                         subscriptionBG,
                                         subscriptionTypesDesc,
                                         subscriptionTypesRef,
                                         setError}) => {
    const [pickedSubType, setPickedSubType] = useState((subscriptionTypesRef && subscriptionTypesRef.current) ? subscriptionTypesRef.current[0] : null)
    const [status, setStatus] = useState(STATUSES.IDLE)
    const location = useLocation()
    const navigation = useNavigate()
    const handleSelect = (subscriptionTypesDesc, index) => {
        console.log(subscriptionTypesRef.current[index])
        setPickedSubType(subscriptionTypesRef.current[index])
        //TODO send request for buying subscription for user (other stuff on the server side)
    }
    const handlePurchaseSubscription = async () => {
        const token = localStorage.getItem("token")
        if (!token) navigation(routes.AUTORIZATION)
        try {
            const response = await purchaseSubscription(localStorage.getItem("token"), pickedSubType.id)
            if (response.data) setStatus(STATUSES.SUCCESS)
            setTimeout(()=>{setStatus(STATUSES.IDLE)}, 3000)
        } catch(e) {
            setError(e.response.data?.error)
        }
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
                            <Button buttonType={status === STATUSES.SUCCESS ? "block" : "alt"}
                                    buttonPadding={"0 20px"}
                                    buttonText={status === STATUSES.IDLE ? "Приобрести" : "Приобретено"}
                                    buttonFunc={handlePurchaseSubscription}
                                    />
                        </div>)}
                </div>)}
            </div>
        </div>
    )
}