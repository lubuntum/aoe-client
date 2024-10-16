import { subscriptionEndDate, subscriptionRemain } from "../../../modules/date/SubscriptionDate"
export const UserSubscription = ({customer}) => {
    console.log(customer.actualSubscriptionDate)
    let subscriptionPurchase = undefined
    let endSubDate = undefined
    let endSubDateStr = undefined
    let daysRemain = undefined
    let daysRemainPersent = undefined
    if (customer.actualSubscriptionDate === undefined || customer.actualSubscriptionDate === null) {
        subscriptionPurchase = <p>Подписьки нет</p>
    } else {
        endSubDate = subscriptionEndDate(customer.actualSubscriptionDate);
        endSubDateStr = endSubDate.toLocaleDateString('en-GB').replace(/\//g,'.') //DD.MM.YYYY
        daysRemain = subscriptionRemain(endSubDate)
        daysRemainPersent = `${(daysRemain / 30) * 100}%`
    }
    return (<>
        <div className="userSubscriptionContainer gridItem2">
            <p>Подписка</p>
            
            {subscriptionPurchase === undefined ? <>
                <div className="userSubscriptionDateEnd">
                    <p>Действует до: <span>{endSubDateStr}</span></p>
                    <p><span>{daysRemain}</span>д.</p>
                </div>
                
                <div className="userSubscriptionProgressBar">
                    <div className="progressBarBackground">
                        <div className="progressBarLine" style={{width: daysRemainPersent}}></div>
                    </div>
                </div>
            </> : subscriptionPurchase}


            <a className="btn" onClick={() => {}}>Продлить</a>
        </div>
    </>)
}