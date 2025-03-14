import { Button } from "../reusible_components/Button"
import { Tooltip } from "../reusible_components/Tooltip"
import { InputField } from "../reusible_components/InputField"
import { useCallback, useState } from "react"
import { createPayment } from "../../modules/api_modules/paymentAPI"
import { useAuth } from "../../modules/auth_modules/AuthProvider.js"
import { useNavigate } from "react-router-dom"
import routes from "../../routes.js"

export const PricingBalance = ({className}) => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()
    const [value, setValue] = useState("")
    const [valuePlaceholder, setValuePlaceholder] = useState("Своя сумма")
    const handleChange = (event) => {
        const inputValue = event.target.value
        const regex = /^\d+(\.\d{0,2})?$/
        if (regex.test(inputValue) || inputValue === "") {
            setValue(inputValue)
        }
    }
    
    const handleCustomerButtonClick = useCallback(async (price) => {
        if (price === undefined || price === null || price <= 0 || price === "") {
            setValuePlaceholder("Введите сумму!")
            return
        }
        const response = await createPayment(localStorage.getItem("token"), price)
        window.location.href = response.data.confirmation.confirmation_url
    }, [])

    const handleStaticButtonClick = useCallback(async (price) => {
        if (price === undefined || price === null || price <=0 || price === "") {
            return
        }
        const response = await createPayment(localStorage.getItem("token"), price)
        window.location.href = response.data.confirmation.confirmation_url
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
                            buttonText={"Пополнить на 50₽"}
                            buttonFunc={()=>{isAuth ? handleStaticButtonClick(50) : navigate(routes.AUTORIZATION)}}/>
                </div>
                <div className="pricingBalanceItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Экспресс проверка 1 экзамена</p>
                    </div>
                    <Button key={`pricingBalanceButton1`}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonText={"Пополнить на 200₽"}
                            buttonFunc={()=>{isAuth ? handleStaticButtonClick(200) : navigate(routes.AUTORIZATION)}}/>
                </div>
                <div className="pricingBalanceItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Экспертная проверка 1 экзамена</p>
                    </div>
                    <Button key={`pricingBalanceButton2`}
                            buttonType={"outline"}
                            buttonWidth={"100%"}
                            buttonText={"Пополнить на 700₽"}
                            buttonFunc={()=>{isAuth ? handleStaticButtonClick(700) : navigate(routes.AUTORIZATION)}}/>
                </div>
                <div className="pricingBalanceSumItem">
                    <div className="pricingBalanceName">
                        <Tooltip tooltipText={"Экспертная проверка осуществляется членом предметной комиссии ЕГЭ по английскому языку"}/>
                        <p>Своя сумма</p>
                    </div>
                    <div className="pricingBalanceSumButton">
                        <div className="pricingBalanceSumContainer">
                            <InputField key={"pricngBalanceInput0"}
                                        inputPlaceholder={valuePlaceholder}
                                        inputValue={value}
                                        inputOnChange={handleChange}/>
                            <p>₽</p>
                        </div>
                        <Button key={"pricingBalanceButton3"}
                                buttonText={"Пополнить"}
                                buttonFunc={()=>{isAuth ? handleCustomerButtonClick(value) : navigate(routes.AUTORIZATION)}}/>
                    </div>
                </div>
            </div>
        </div>
    )
}