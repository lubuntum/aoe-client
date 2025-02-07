import React, { useCallback } from "react"
import { Button } from "../reusible_components/Button"
import { createPayment } from "../../modules/api_modules/paymentAPI"
import { useNavigate } from "react-router-dom"

export const PricingBalanceCard = React.memo(({className, paymentBG, paymentPricing, paymentDescription}) => {
    const navigate = useNavigate()
    const handleButtonClick = useCallback( async (price) => {
        console.log(price.replace(/\D/g, ''))
        const response = await createPayment(localStorage.getItem("token"), price.replace(/\D/g, ''))
        console.log(response)
        window.location.href = response.data.confirmation.confirmation_url

    }, [])

    return (
        <div className={`pricngBalanceCardContainer ${className}`} style={{backgroundImage: `url(${paymentBG})`}}>
            <div className="pricingBalanceCardContent">
                <div className="pricingBalanceCardPrices">
                    {paymentPricing.map((price, index) => (
                        <div className="cardPriceContainer" key={`pricingBalance${index}`}>
                            <div className="cardPrice">+ {price}</div>
                            <div className="cardButton">
                                <Button buttonType={"alt"}
                                        buttonWidth={"100%"}
                                        buttonText={"Пополнить"}
                                        buttonFunc={()=> {handleButtonClick(price)}}/>
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