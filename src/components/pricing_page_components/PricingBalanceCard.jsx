import React, { useCallback } from "react"
import { Button } from "../reusible_components/Button"

export const PricingBalanceCard = React.memo(({className, paymentBG, paymentPricing, paymentDescription}) => {
    const handleButtonClick = useCallback(() => {

    }, [])

    return (
        <div className={`pricngBalanceCardContainer ${className}`} style={{backgroundImage: `url(${paymentBG})`}}>
            <div className="pricingBalanceCardContent">
                <div className="pricingBalanceCardPrices">
                    {paymentPricing.map((item, index) => (
                        <div className="cardPriceContainer" key={`pricingBalance${index}`}>
                            <div className="cardPrice">+ {item}</div>
                            <div className="cardButton">
                                <Button buttonType={"alt"}
                                        buttonWidth={"100%"}
                                        buttonText={"Пополнить"}
                                        buttonFunc={handleButtonClick}/>
                            </div>
                        </div>
                    ))}
                    <div className="cardPriceContainer pricingBalanceGridItemLast" key={`pricingBalance6`}>
                        <div className="cardPrice">Своя сумма</div>
                        <div className="cardOptions">
                            <div className="inputContainer">
                                <input type="number" placeholder="Сумма" required></input>
                            </div>
                            <Button buttonType={"alt"}
                                    buttonWidth={"70%"}
                                    buttonText={"Пополнить"}
                                    buttonFunc={handleButtonClick}/>
                        </div>
                    </div>
                </div>
                <div className="pricingBalanceCardDescription">
                    {paymentDescription.map((item, index) => (
                        <div className="cardDescriptionItem" key={`pricingDescription${index}`}>
                            <div className="cardDescriptionBorder"></div>
                            {item}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
})