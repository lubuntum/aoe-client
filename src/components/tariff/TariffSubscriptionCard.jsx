

export const TariffSubscriptionCard = ({tariffType, tariffBackground, tariffPrice}) => {
    return (<>
        <div className="subscriptionCardContainer tariffGridItemRow" style={{backgroundImage: `url(${tariffBackground})`,
                                                                             backgroundSize: "cover",
                                                                             backgroundRepeat: "no-repeat",
                                                                             backgroundPosition: "center"}}>
            <div className="subscriptionCardWrapper">
                <div className="subscriptionName">
                    {tariffType === "base" ?
                    <p>Базовая</p> :
                    <p>Стандарт</p>}
                </div>

                <div className="subscriptionDescriptionContainer">
                    <div className="subscriptionDescription">
                        <p>6 приветственных токенов при оплате ПЕРВОЙ подписки</p>
                    </div>
                    <div className="subscriptionDescription">
                        <p>Моментальный доступ к 5 вариантам</p>
                    </div>
                    <div className="subscriptionDescription">
                        <p>Хранение результатов в течении 24 часов</p>
                    </div>
                </div>

                <div className="subscriptionCost">
                    {tariffType === "base" ? 
                        <p>FREE</p> :
                        <p>{tariffPrice}₽<br/><span>/ 1 месяц</span></p>}
                </div>
            </div>

            {tariffType != "base" &&
                <div className="subscriptionOptions">
                    <div className="defDDContainer" style={{width: "200px"}}>
                        <select className="defDD">
                            <option value={1}>1 месяц</option>
                            <option value={3}>3 месяца</option>
                            <option value={6}>6 месяцев</option>
                            <option value={12}>12 месяцев</option>
                        </select>
                    </div>
                    <a className="btn whiteBtn" style={{width: "200px"}}>Купить</a>
                </div>}
        </div>
    </>)
}