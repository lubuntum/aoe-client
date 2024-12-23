import "./css/tariff_concept.css"
import "./css/tariff_card_concept.css"

import { Header } from "../header/Header"
import { TariffTitle } from "./TariffTitle"
import { TariffSecondTitle } from "./TariffSecondTitle"
import { TariffCard } from "./TariffCard"

import BaseBGImage from "../../res/svgs/base_bg_image.png"
import StandartBGImage from "../../res/svgs/standart_bg_image.png"
import ExpressBGImage from "../../res/svgs/express_bg_image.png"
import ExpertBGImage from "../../res/svgs/expert_bg_image.png"

export const TariffPageConcept = () => {
    const freeDescriptionList = [
        "Моментальный доступ к 5 вариантам",
        "Хранение результатов в течении 24 часов"
    ]
    const standartDescriptionList = [
        "Моментальный доступ ко ВСЕМ вариантам",
        "Хранение результатов в течение срока подписки",
        "6 приветственных токенов при оплате ПЕРВОЙ подписки"
    ]
    const expressDescriptionList = [
        "Срок действия токенов 270 дней",
        "Больше токенов - Меньше цена",
        "Проверка осуществляется индийскими экстрасенсами под героином",
        "Результат проверки через 5 минут",
        "Можно проверять по заданиям",
        "Экзамен - проверка за 6 токенов"

    ]
    const expertDescriptionList = [
        "Срок действия токенов 270 дней",
        "Больше токенов - Меньше цена",
        "Проверку осуществляет эксперт предметной комиссии ЕГЭ по английскому языку",
        "Результат проверки через N минут",
        "Экзамен - проверка за 12 токенов"
    ]

    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="tariffWrapper">
                    <Header/>
                    <div className="tariffContainer">
                        <div className="tarrifTitlesContainer">
                            <TariffTitle/>
                            <TariffSecondTitle/>
                        </div>
                        
                        <div className="tariffConceptGrid">
                            <TariffCard pos={"left"} type={"base"} description={freeDescriptionList} price={"FREE"} per={""} bg={BaseBGImage}/>
                            <TariffCard pos={"left"} type={"standart"} description={standartDescriptionList} price={"150"} per={"1 месяц"} bg={StandartBGImage}/>
                            <TariffCard pos={"right"} type={"express"} description={expressDescriptionList} price={"50"} per={"1 токен"} bg={ExpressBGImage}/>
                            <TariffCard pos={"right"} type={"expert"} description={expertDescriptionList} price={"600"} per={"12 токенов"} bg={ExpertBGImage}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}   