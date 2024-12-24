import "./css/tariff.css"
import "./css/tariff_subscription_card.css"
import "./css/tariff_token_card.css"

import BaseBackground from "../../res/svgs/base_bg.svg"
import StandartBackground from "../../res/svgs/standart_bg.svg"
import ExpressBackground from "../../res/svgs/express_bg.svg"
import ExpertBackground from "../../res/svgs/expert_bg.svg"

import { Header } from "../header/Header"
import { TariffTitle } from "./TariffTitle"
import { TariffSubscriptionCard } from "./TariffSubscriptionCard"
import { TariffTokenCard } from "./TariffTokenCard"

export const TariffPage = () => {
    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="tariffWrapper">
                    <Header/>
                    <div className="tariffContainer">
                        <TariffTitle/>
                        <div className="tariffGrid">
                            <TariffSubscriptionCard tariffType={"base"} tariffBackground={BaseBackground} tariffPrice={""}/>
                            <TariffSubscriptionCard tariffType={"standart"} tariffBackground={StandartBackground} tariffPrice={"150"}/>
                            <TariffTokenCard tariffType={"express"} tariffBackground={ExpressBackground} tariffPrice={"50"}/>
                            <TariffTokenCard tariffType={"expert"} tariffBackground={ExpertBackground} tariffPrice={"600"}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}   