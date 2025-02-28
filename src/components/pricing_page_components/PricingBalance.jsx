import { Button } from "../reusible_components/Button"
import { Tooltip } from "../reusible_components/Tooltip"
import { InputField } from "../reusible_components/InputField"
import { useCallback, useState } from "react"
import { createPayment } from "../../modules/api_modules/paymentAPI"

export const PricingBalance = ({className}) => {
    const [value, setValue] = useState("")
    const [valuePlaceholder, setValuePlaceholder] = useState("Своя сумма")
    const handleChange = (event) => {
        const inputValue = event.target.value
        const regex = /^\d+(\.\d{0,2})?$/
        if (regex.test(inputValue) || inputValue === "") {
            setValue(inputValue)
        }
    }
    const handleButtonClick = useCallback(async (price) => {
        console.log(value)
        if (price === undefined || price === null || price <= 0 || price === "") {
            setValuePlaceholder("Введите сумму!")
            return
        }
        const response = await createPayment(localStorage.getItem("token"), price)
        window.location.href = response.data.confirmation.confirmation_url
        console.log("aboba")
    }, [])

    return (
        <div className={`pricingBalanceContainer ${className}`}>
            <div className="pricingBalanceTitle">
                <p>Пополнить баланс</p>
                <p>* Срок действия баланса - 270 дней</p>
            </div>
            <div className="divider"></div>
            <div className="pricingBalanceWrapper">
                <div className="pricingBalanceItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Экспресс проверка 1 задания</p>
                    </div>
                    <Button key={`pricingBalanceButton0`}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonText={"Пополнить на 50₽"}/>
                </div>
                <div className="pricingBalanceItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Экспресс проверка 1 экзамена</p>
                    </div>
                    <Button key={`pricingBalanceButton1`}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonText={"Пополнить на 200₽"}/>
                </div>
                <div className="pricingBalanceItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Экспертная проверка 1 экзамена</p>
                    </div>
                    <Button key={`pricingBalanceButton2`}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonText={"Пополнить на 700₽"}/>
                </div>
                <div className="pricingBalanceSumItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Своя сумма</p>
                    </div>
                    <div className="pricingBalanceSumButton">
                        <InputField key={"pricngBalanceInput0"}
                                    inputPlaceholder={valuePlaceholder}
                                    inputValue={value}
                                    inputOnChange={handleChange}/>
                        <Button key={"pricingBalanceButton3"}
                                buttonText={"Пополнить"}
                                buttonFunc={()=>handleButtonClick(value)}/>
                    </div>
                </div>
            </div>
        </div>
    )
}