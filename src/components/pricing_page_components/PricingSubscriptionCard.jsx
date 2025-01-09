import { Button } from "../reusible_components/Button"

export const PricingSubscriptionCard = ({className, contentSwap, subscriptionType, subscriptionName, subscriptionDescription, subscriptionIsActive, subscriptionBG}) => {
    return (<>
        <div className={`pricngSubscriptionCardContainer ${className}`} style={{backgroundImage: `url(${subscriptionBG})`}}>
            <div className="pricingSubscriptionCardContent">
                <div className={`pricingSubscriptionCardName ${contentSwap === false ? "" : "contentSwapName"}`}>
                    <p>{subscriptionName}</p>
                    <p>{subscriptionIsActive}</p>
                </div>
                <div className={`pricingSubscriptionCardDescription ${contentSwap === false ? "" : "contentSwapDescription"}`}>
                    <div className="cardDescriptionItem">
                        <div className={`cardDescriptionBorder ${contentSwap === false ? "" : "contentSwapBorder"}`}></div>
                        <p>Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
                <div className={`pricingSubscriptionOptions ${contentSwap === false ? "" : "contentSwapOptions"}`}>
                    {subscriptionType === "base" ? 
                        <div className="subscriptionOptionsEmpty">
                            <p>Бесплатно</p>
                        </div> : 
                        <div className="subscriptionOptions">
                            <Button/>
                            <Button buttonType={"alt"}
                                    buttonPadding={"0 20px"}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={"Подключить"}
                                    buttonFunc={()=>{}}/>
                        </div>}
                </div>
            </div>
        </div>
    </>)
}