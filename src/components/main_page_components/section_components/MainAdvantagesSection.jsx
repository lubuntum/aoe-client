import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainAdvantages } from "./MainAdvantages"

import { ReactComponent as DuckIcon } from "../../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../../res/icons/bat-svgrepo-com.svg"
import { ReactComponent as ChameleonIcon } from "../../../res/icons/chameleon-svgrepo-com.svg"

export const MainAdvantagesSection = React.memo(() => {
    const mainAdvantages = useMemo(() => [
        {image: <DuckIcon className="svgIcon"/>, text: "#Максимальное соответствие реальному формату ЕГЭ# Наши задания точно повторяют формат реального экзамена, помогая тебе адаптироваться и снизить тревожность."},
        {image: <SnakeIcon className="svgIcon"/>, text: "#Мгновенная обратная связь# После выполнения заданий ты сразу узнаешь свои баллы, что помогает выявить слабые места и улучшить свои навыки."},
        {image: <HuskyIcon className="svgIcon"/>, text: "#Большой выбор тем# Широкий спектр тем обеспечит комплексную подготовку всех типов заданий устной части ЕГЭ."},
        {image: <BatIcon className="svgIcon"/>, text: "#Экономия времени и денег# Практикуйся в любом удобном месте и удобное время дешевле чем у репетитора."},
    ], [])

    return (
        <div className="contentWrapper">
            <div className='advantagesWrapper'>
                <PageTitle pageTitleText={"С нами ты #существенно повысишь# шансы сдать устную часть ЕГЭ на максимальный балл!"}/>
                <div className="advantagesContainer">
                    {mainAdvantages.map((item, index) => (
                        <MainAdvantages key={`adv${index}`} advantageImage={item.image} advantageText={item.text}/>
                    ))}
                </div>
            </div>
        </div>
    )
})