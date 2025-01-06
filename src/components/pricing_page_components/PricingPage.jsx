import "./css/pricing_page.css"
import "./css/pricing_card.css"
import "./css/pricing_cost.css"

import { HeaderMain } from "../header_components/HeaderMain"
import { PricingCard } from "./PricingCard"

import { PageTitle } from "../reusible_components/PageTitle"

import PricingBaseBackground from "../../res/images/pricing_base_background.png"
import PricingStandartBackground from "../../res/images/pricing_standart_background.png"
import PricingFirstPackBackground from "../../res/images/pricing_first_pack_background.png"
import PricingSecondPackBackground from "../../res/images/pricing_second_pack_background.png"

export const PricingPage = () => {
    const freeDescriptionList = [
        "Моментальный доступ к 5 вариантам",
        "Хранение результатов в течении 24 часов"
    ]
    const standartDescriptionList = [
        "Моментальный доступ ко ВСЕМ вариантам",
        "Хранение результатов в течение 30 дней, пока действует подписка",
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
                    <HeaderMain/>
                    <div className="tariffContainer">
                        <div className="tarrifTitlesContainer">
                            <PageTitle pageTitleText={"Подписка на сервис"}/>
                            <PageTitle pageTitleText={"Пополнить баланс"}/>
                        </div>
                        
                        <div className="tariffConceptGrid">
                            <PricingCard pos={"left"} 
                                         type={"base"} 
                                         typeDescription={"Подписка"}
                                         description={freeDescriptionList} 
                                         price={"FREE"} 
                                         per={""} 
                                         bg={PricingBaseBackground}/>

                            <PricingCard pos={"left"} 
                                         type={"standart"}
                                         typeDescription={"Подписка"}
                                         description={standartDescriptionList} 
                                         price={"150"} 
                                         per={"1 месяц"} 
                                         bg={PricingStandartBackground}/>

                            <PricingCard pos={"right"} 
                                         type={"express"}
                                         typeDescription={"Пополнение баланса"}
                                         description={expressDescriptionList} 
                                         price={"50"} 
                                         per={"1 токен"} 
                                         bg={PricingFirstPackBackground}/>

                            <PricingCard pos={"right"} 
                                         type={"expert"} 
                                         typeDescription={"Пополнение баланса"}
                                         description={expertDescriptionList} 
                                         price={"600"} 
                                         per={"12 токенов"} 
                                         bg={PricingSecondPackBackground}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}   