import { useNavigate } from "react-router-dom"
import routes from "../../../routes"

import { subscriptionDaysRemain, subscriptionRemainPercent } from "../../../modules/date_modules/subscriptionDate"

import { Button } from "../../reusible_components/Button"

export const UserSubscription = ({customer, className}) => {
    const navigate = useNavigate()
    const daysRemain = customer.expireSubDate ? subscriptionDaysRemain(customer.expireSubDate) : null
    const daysRemainPercent = (customer.purchaseSubDate && customer.expireSubDate) ? subscriptionRemainPercent( customer.purchaseSubDate, customer.expireSubDate) : null
    const setColor = (percent) => {
        if (percent > 51) {return "#06d6a0"}
        if (percent <= 50 && percent >= 26) {return "#ffd166"}
        if (percent <= 25){return "#ef476f"}
    }

    
    return (<>
        <div className={`userSubscriptionContainer ${className}`}>
            <p>Подписка</p>
            
            {(customer.expireSubDate && daysRemain >= 0) ? <>
                <div className="userSubscriptionDateEnd">
                    <p>Действует до: <span>{customer.expireSubDate}</span></p>
                    <p><span>{daysRemain}</span>д.</p>
                </div>
                
                <div className="userProgressBarBackground">
                    <div className="userProgressBarLine" style={{width: `${daysRemainPercent}%`, 
                                                                 backgroundColor: setColor(daysRemainPercent),
                                                                 boxShadow: `0 0 5px ${setColor(daysRemainPercent)}`,
                    }}></div>
                </div>
            </> : <p>Подписки нет</p>}

            <Button buttonType={""}
                    buttonPadding={"0 20px"}
                    buttonWidth={"100%"}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Продлить"}
                    buttonFunc={()=>{navigate(routes.PRICING)}}/>
        </div>
    </>)
}