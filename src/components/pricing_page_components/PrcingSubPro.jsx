import { useState } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"

export const PricingSubPro = ({className, pricingSubDesc, subscriptionTypesDesc, subscriptionTypesRef}) => {
    const handleSelect = (subscriptionTypesDesc, index) => {
        setPickedSubType(subscriptionTypesRef.current[index])
        //TODO send request for buying subscription for user (other stuff on the server side)
    }
    const [pickedSubType, setPickedSubType] = useState((subscriptionTypesRef && subscriptionTypesRef.current) ? subscriptionTypesRef.current[0] : null)

    return (
        <div className={`pricingSuProContainer ${className}`}>
            <div className="pricingSubTitle">
                <p>Подписка</p>
                <p>Активен</p>
            </div>
            <div className="divider"></div>
            <div className="pricingSubWrapper">
                <div className="pricingSubDesc">
                    {pricingSubDesc.map((desc, index) => (
                        <div className="pricingSubDescItem">
                            <div className="verticalDivider"></div>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
                <div className="prcingSubButton">
                    {subscriptionTypesDesc &&
                    <DropdownList key={"prcingSubDropdown0"}
                                  options={subscriptionTypesDesc}
                                  onSelect={handleSelect}/>}
                    <Button key={"pricingSubButton0"}
                            buttonText={"Приобрести"}/>
                </div>
            </div>
        </div>
    )
}