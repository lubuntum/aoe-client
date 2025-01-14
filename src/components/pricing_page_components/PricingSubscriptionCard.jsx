import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { useLocation } from "react-router-dom"
import routes from "../../routes"

export const PricingSubscriptionCard = ({className, contentSwap, subscriptionType, subscriptionName, subscriptionDescription, subscriptionIsActive, subscriptionBG, subscriptionPricing}) => {
    const location = useLocation()
    const handleSelect = (subscriptionPricing) => {
        console.log(subscriptionPricing)
    }

    return (<>
        <div className={`pricngSubscriptionCardContainer ${className}`} style={{backgroundImage: `url(${subscriptionBG})`}}>
            <div className="pricingSubscriptionCardContent">
                <div className={`pricingSubscriptionCardName ${contentSwap === false ? "" : "contentSwapName"}`}>
                    <p>{subscriptionName}</p>
                    <p>{subscriptionIsActive}</p>
                </div>
                <div className={`pricingSubscriptionCardDescription ${contentSwap === false ? "" : "contentSwapDescription"}`}>
                    {subscriptionDescription.map((description, index) => (
                        <div className="cardDescriptionItem">
                            <div className={`cardDescriptionBorder ${contentSwap === false ? "" : "contentSwapBorder"}`}></div>
                            <p>{description}</p>
                        </div>
                    ))}
                </div>
                {location.pathname !== routes.HOME &&
                <div className={`pricingSubscriptionOptions ${contentSwap === false ? "" : "contentSwapOptions"}`}>
                    {subscriptionType === "base" ? 
                        <div className="subscriptionOptionsEmpty">
                            <p>Бесплатно</p>
                        </div> : 
                        <div className="subscriptionOptions">
                            <DropdownList options={subscriptionPricing} onSelect={handleSelect}/>
                            <Button buttonType={"alt"}
                                    buttonPadding={"0 20px"}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={"Приобрести"}
                                    buttonFunc={()=>{}}/>
                        </div>}
                </div>}
            </div>
        </div>
    </>)
}