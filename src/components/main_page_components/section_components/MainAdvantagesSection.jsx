import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainAdvantages } from "./MainAdvantages"

import { ReactComponent as DuckIcon } from "../../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../../res/icons/bat-svgrepo-com.svg"

export const MainAdvantagesSection = React.memo(() => {
    const mainAdvantages = useMemo(() => [
        {
            image: <DuckIcon className="svgIcon"/>, 
            name: "Максимальное соответствие реальному формату ЕГЭ",
            desc: "Наши задания точно повторяют формат реального экзамена, помогая тебе адаптироваться и снизить тревожность"
        },
        {
            image: <SnakeIcon className="svgIcon"/>, 
            name: `Мгновенная обратная связь`,
            desc: "После выполнения заданий ты сразу узнаешь свои баллы, что помогает выявить слабые места и улучшить свои навыки"
        },
        {
            image: <HuskyIcon className="svgIcon"/>, 
            name: "Большой выбор тем",
            desc: "Широкий спектр тем обеспечит комплексную подготовку всех типов заданий устной части ЕГЭ"
        },
        {
            image: <BatIcon className="svgIcon"/>, 
            name: "Экономия времени и денег",
            desc: "Практикуйся в любом удобном месте и удобное время дешевле чем у репетитора"
        },
    ], [])

    return (
        <div className="contentWrapper">
            <div className='advantagesWrapper'>
                <PageTitle pageTitleText={"С нами ты #существенно повысишь шансы# сдать устную часть ЕГЭ на максимальный балл!"}/>
                <div className="advantagesContainer">
                    {mainAdvantages.map((item, index) => (
                        <MainAdvantages key={`adv${index}`} advantageImage={item.image} advantageName={item.name} advantageDescription={item.desc}/>
                    ))}
                </div>
            </div>
        </div>
    )
})