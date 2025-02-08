import React, { useCallback, useState } from "react"
import { Button } from "../reusible_components/Button"
import { createPayment } from "../../modules/api_modules/paymentAPI"
import { useNavigate } from "react-router-dom"

export const PricingBalanceCard = React.memo(({className, paymentBG, paymentPricing, paymentDescription}) => {
    const navigate = useNavigate()
    const [inputFormatErr, setInputFormatErr] = useState(false)
    const [customerPrice, setCustomerPrice] = useState('')
    const regex = /^(?:\d+|\d+\.\d{1,2})$/
    const handleButtonClick = useCallback( async (price) => {
        if (price === undefined || price === null || price <= 0) return
        price = price.replace(/[^0-9.,]/g, "")
        if (!regex.test(price) || price === '') {
            console.log(`Wrong format ${price}`)
            return
        }
        const response = await createPayment(localStorage.getItem("token"), price)
        window.location.href = response.data.confirmation.confirmation_url

    }, [])
    const handleCustomerPrice = (price) => {
        if (!regex.test(price) || price === '') {
            setInputFormatErr(true)
            setCustomerPrice(null)
            return
        }
        setInputFormatErr(false)
        setCustomerPrice(price)
    }
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
                                <input style={{color:inputFormatErr ? "red": "initial"}} onChange={(e)=>{handleCustomerPrice(e.target.value)}} type="text" placeholder="Сумма" required></input>
                            </div>
                            <Button buttonType={"alt"}
                                    buttonWidth={"70%"}
                                    buttonText={"Пополнить"}
                                    buttonFunc={()=> {handleButtonClick(customerPrice)}}/>
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