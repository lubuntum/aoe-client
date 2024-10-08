export const UserSubscription = () => {
    return (<>
        <div className="userSubscriptionContainer gridItem2">
            <p>Подписка</p>
            
            <div className="userSubscriptionDateEnd">
                <p>Действует до: <span>26.08.2024</span></p>
                <p><span>26</span>д.</p>
            </div>
            
            <div className="userSubscriptionProgressBar">
                <div className="progressBarBackground">
                    <div className="progressBarLine" style={{width: "75%"}}></div>
                </div>
            </div>

            <a className="btn" onClick={() => {}}>Продлить</a>
        </div>
    </>)
}