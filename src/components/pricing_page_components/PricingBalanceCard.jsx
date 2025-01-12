import { Button } from "../reusible_components/Button"

export const PricingBalanceCard = ({className, paymentBG, paymentPricing, paymentDescription}) => {
    return (<>
        <div className={`pricngBalanceCardContainer ${className}`} style={{backgroundImage: `url(${paymentBG})`}}>
            <div className="pricingBalanceCardContent">
                <div className="pricingBalanceCardPrices">
                    {paymentPricing.map((paymentItem, index) => (
                        <div className="cardPriceContainer">
                            <div className="cardPrice">+ {paymentItem}</div>
                            <div className="cardButton">
                                <Button buttonType={"alt"}
                                        buttonPadding={""}
                                        buttonWidth={"100%"}
                                        buttonHeight={""}
                                        buttonIcon={""}
                                        buttonText={"Пополнить"}
                                        buttonFunc={()=>{}}/>
                            </div>
                        </div>
                    ))}
                    <div className="cardPriceContainer pricingBalanceGridItemLast">
                        <div className="cardPrice">Своя сумма</div>
                        <div className="cardOptions">
                            <div className="inputContainer">
                                <input type="text"
                                    placeholder="Сумма" 
                                    required>
                                </input>
                            </div>
                            <Button buttonType={"alt"}
                                    buttonPadding={""}
                                    buttonWidth={"70%"}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={"Пополнить"}
                                    buttonFunc={()=>{}}/>
                        </div>
                    </div>
                </div>
                <div className="pricingBalanceCardDescription">
                    {paymentDescription.map((description, index) => (
                        <div className="cardDescriptionItem">
                            <div className="cardDescriptionBorder"></div>
                            {description}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>)
}