import { useEffect, useState } from "react"
import { Button } from "../reusible_components/Button"
import { DropdownList } from "../reusible_components/DropdownList"
import { getHeaderData } from "../../modules/api_modules/accountAPI"
import { purchaseSubscription } from "../../modules/api_modules/subscriptionAPI"
import { PricingPopup } from "./PricingPopup"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"

export const PricingSubPro = ({className, pricingSubDesc, subscriptionTypesDesc, subscriptionTypesRef, setContentPopup, setUpdateHeaderData, setShowPopup}) => {
    const navigate = useNavigate()
    const [currentBalance, setCurrentBalance] = useState(0)
    const [pickedSubType, setPickedSubType] = useState((subscriptionTypesRef && subscriptionTypesRef.current) ? subscriptionTypesRef.current[0] : null)
    const handleSelect = (subscriptionTypesDesc, index) => {
        setPickedSubType(subscriptionTypesRef.current[index])
        //TODO send request for buying subscription for user (other stuff on the server side)
    }

    const handlePurchaseSubscription = async () => {
        try {
            const response = await purchaseSubscription(localStorage.getItem("token"), pickedSubType.id)
            if (response.data) {
                setUpdateHeaderData(true)
                setContentPopup(() => (props) => (
                    <PricingPopup
                        warningMessage={"Успех!"}
                        messageText={"Подписка на наш сервис успешно оформлена. Теперь у Вас есть доступ ко всем преимуществам и эксклюзивному контенту."}
                        acceptButton={<Button key={"purchaseButton4"}
                                              buttonText={"Закрыть"}
                                              buttonWidth={"100%"}
                                              buttonFunc={()=>{
                                                  setShowPopup(false)}}/>}
                        {...props}/>
                ))
                setShowPopup(true)
            }
            setTimeout(()=>{console.log("idle")}, 3000)
        } catch (err) {
            console.error("Failed to purchase subscription!", err.response.data?.error)
        }
    }

    const handlePurchaseButtonClick = () => {
        if (!localStorage.getItem("token")) navigate(routes.AUTORIZATION)
        if (currentBalance < pickedSubType.price) {
            setContentPopup(() => (props) => (
                <PricingPopup 
                    warningMessage={"Внимание!"}
                    messageText={"На Вашем балансе недостаточно средств для оформления подписки!"}
                    messageCost={"На Вашем балансе должно быть минимум:"}
                    cost={pickedSubType.price}
                    messageConfirmation={"Подписка может быть оформлена сразу после оплаты в сервисе для платежей! Вы хотите оформить подписку сразу после оплаты?"}
                    acceptButton={<Button key={"purchaseButton0"}
                                          buttonText={"Да"}
                                          buttonWidth={"100%"}
                                          buttonFunc={()=>{
                                              setShowPopup(false)
                                              console.log("Здесь надо перенаправить на оплату подписки!")}}/>}
                    declineButton={<Button key={"purchaseButton1"}
                                           buttonText={"Нет"}
                                           buttonType={"outline"}
                                           buttonWidth={"100%"}
                                           buttonFunc={()=>{
                                              setShowPopup(false)}}/>} 
                    {...props}/>
            ))
            setShowPopup(true)
        } else {
            setContentPopup(() => (props) => (
                <PricingPopup
                    warningMessage={"Внимание!"}
                    messageText={`У Вас на балансе хватает денег для покупки подписки на ${pickedSubType.monthsCount} мес.`}
                    messageCost={"С Вашего баланса спишется:"}
                    cost={pickedSubType.price}
                    messageConfirmation={"Вы подтверждаете что хотите приобрести подписку?"}
                    acceptButton={<Button key={"purchaseButton2"}
                                          buttonText={"Да"}
                                          buttonWidth={"100%"}
                                          buttonFunc={()=>{
                                              setShowPopup(false)
                                              handlePurchaseSubscription()}}/>}
                    declineButton={<Button key={"purchaseButton3"}
                                           buttonText={"Нет"}
                                           buttonType={"outline"}
                                           buttonWidth={"100%"}
                                           buttonFunc={()=>{
                                              setShowPopup(false)}}/>}
                    {...props}/>
            ))
            setShowPopup(true)
        }
    }

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await getHeaderData(localStorage.getItem("token"))
                setCurrentBalance(response.data.currentBalance)
            } catch (err) {
                console.error("Failed to fetch balance", err)
            }
        }
        fetchBalance()
    }, [handlePurchaseButtonClick])

    return (
        <div className={`pricingSubProContainer ${className}`}>
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
                            buttonText={"Приобрести"}
                            buttonFunc={handlePurchaseButtonClick}/>
                </div>
            </div>
        </div>
    )
}