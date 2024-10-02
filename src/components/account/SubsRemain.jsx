import { ReactComponent as WarningIcon } from "../../res/icons/error_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const SubsRemain = () => {
    return (<>
    <div className="subscriptionCardWrapper">
        <div className="cardTitle">
            <p className="subscriptionCardTitle">Подписка</p>
            <div className="horizontalDivider"></div>
        </div>
        <div className="subscriptionCardInfo">
            <p>Действует до:<br/><span>Дата Дата</span></p>
            <div className="progressBarWrapper">
                <div className="progressBarOuter">
                    <div className="progressBarInner">
                        <div className="remainDays"><span>00</span> д.</div>
                    </div>
                </div>
                <svg width={100} height={100}>
                    <circle r={45} cx={100/2} cy={100/2}></circle>
                </svg>
            </div>
            <a className="btn" style={{width: "100%"}} onClick={() => {}}>Продлить</a>
        </div>
    </div>
    </>)
}