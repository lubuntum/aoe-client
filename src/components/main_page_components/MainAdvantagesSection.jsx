import React, { useMemo } from "react"

import { PageTitle } from "../reusible_components/PageTitle"
import { MainAdvantages } from "./MainAdvantages"

import { ReactComponent as DuckIcon } from "../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../res/icons/bat-svgrepo-com.svg"
import { ReactComponent as ChameleonIcon } from "../../res/icons/chameleon-svgrepo-com.svg"

export const MainAdvantagesSection = () => {
    const mainAdvantages = useMemo(() => [
        {image: <DuckIcon className="svgIcon"/>, text: "Первое наименование"},
        {image: <SnakeIcon className="svgIcon"/>, text: "Второе наименование"},
        {image: <CatIcon className="svgIcon"/>, text: "Третье наименование"},
        {image: <HuskyIcon className="svgIcon"/>, text: "Четвертое наименование"},
        {image: <BatIcon className="svgIcon"/>, text: "Пятое наименование"},
        {image: <ChameleonIcon className="svgIcon"/>, text: "Шестое наименование"}
    ], [])

    return (<>
        <div className="contentWrapper">
            <div className='advantagesWrapper'>
                <PageTitle pageTitleText={"#6 плюсов# которые помогут Вам лучше подготовиться к экзамену"}/>
                <div className="advantagesContainer">
                    {mainAdvantages.map((item, index) => (
                        <MainAdvantages key={index} advantageImage={item.image} advantageText={item.text}/>
                    ))}
                </div>
            </div>
        </div>
    </>)
}