import { subscriptionEndDate, subscriptionRemain } from "../../../modules/date/SubscriptionDate"
export const UserSubscription = ({customer}) => {
    let endSubDate = subscriptionEndDate(customer.actualSubscriptionDate);
    let endSubDateStr = endSubDate.toLocaleDateString('en-GB').replace(/\//g,'.') //DD.MM.YYYY
    let daysRemain = subscriptionRemain(endSubDate)
    let daysRemainPersent = `${(daysRemain / 30) * 100}%`
    return (<>
        <div className="userSubscriptionContainer gridItem2">
            <p>Подписка</p>
            
            <div className="userSubscriptionDateEnd">
                <p>Действует до: <span>{endSubDateStr}</span></p>
                <p><span>{daysRemain}</span>д.</p>
            </div>
            
            <div className="userSubscriptionProgressBar">
                <div className="progressBarBackground">
                    <div className="progressBarLine" style={{width: daysRemainPersent}}></div>
                </div>
            </div>

            <a className="btn" onClick={() => {}}>Продлить</a>
        </div>
    </>)
}