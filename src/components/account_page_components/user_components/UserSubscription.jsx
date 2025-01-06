import { useNavigate } from "react-router-dom"
import routes from "../../../routes"

import { subscriptionEndDate, subscriptionRemain } from "../../../modules/date_modules/subscriptionDate"

import { Button } from "../../reusible_components/Button"

export const UserSubscription = ({customer, className}) => {
    const navigate = useNavigate()

    let subscriptionPurchase = undefined
    let endSubDate = undefined
    let endSubDateStr = undefined
    let daysRemain = undefined
    let daysRemainPersent = undefined

    if (customer.actualSubscriptionDate === undefined || customer.actualSubscriptionDate === null
        || customer.actualSubscriptionDate === '') {
        subscriptionPurchase = <p>Подписки нет</p>
    } else {
        endSubDate = subscriptionEndDate(customer.actualSubscriptionDate);
        endSubDateStr = endSubDate.toLocaleDateString('en-GB').replace(/\//g,'.') //DD.MM.YYYY
        daysRemain = subscriptionRemain(endSubDate)
        //TODO не делить на 30, потому-что должно зависить от длительности подписки
        daysRemainPersent = Math.round(daysRemain === 0 ? 0 : (daysRemain / 30) * 100)
        //daysRemainPersent = `${(daysRemain / 30) * 100}%`
    }

    const setColor = (percent) => {
        if (percent > 51) {return "#06d6a0"}
        if (percent <= 50 && percent >= 26) {return "#ffd166"}
        if (percent <= 25){return "#ef476f"}
    }
    const progressBarColor = setColor(daysRemainPersent)
    
    return (<>
        <div className={`userSubscriptionContainer ${className}`}>
            <p>Подписка</p>
            
            {subscriptionPurchase === undefined ? <>
                <div className="userSubscriptionDateEnd">
                    <p>Действует до: <span>{endSubDateStr}</span></p>
                    <p><span>{daysRemain}</span>д.</p>
                </div>
                
                <div className="userProgressBarBackground">
                    <div className="userProgressBarLine" style={{width: `${daysRemainPersent}%`, 
                                                                 backgroundColor: progressBarColor,
                                                                 boxShadow: `0 0 5px ${progressBarColor}`,
                    }}></div>
                </div>
            </> : subscriptionPurchase}

            <Button buttonType={""}
                    buttonPadding={"0 20px"}
                    buttonWidth={"100%"}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Продлить"}
                    buttonFunc={()=>{navigate(routes.TARIFF)}}/>
        </div>
    </>)
}