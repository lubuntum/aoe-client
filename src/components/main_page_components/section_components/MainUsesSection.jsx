import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainUses } from "./MainUses"

import bannerImage from "../../../res/images/banner_image_education_amico.svg"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

import { ReactComponent as DuckIcon } from "../../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../../res/icons/husky-svgrepo-com.svg"

export const MainUsesSection = React.memo(() => {
    const mainUses = useMemo(() => [
        {image: <DuckIcon className="svgIcon"/>, text: "Создай аккаунт"},
        {image: <SnakeIcon className="svgIcon"/>, text: "Изучи планы по улучшению подписки"},
        {image: <CatIcon className="svgIcon"/>, text: "Пополни баланс"},
        {image: <HuskyIcon className="svgIcon"/>, text: "Оттачивай навыки говорения и забирай высший балл!"}
    ], [])

    return (
        <div className="contentWrapper">
            <div className='usesWrapper'>
                <PageTitle pageTitleText={"Всего 4 шага на пути к #максимальному баллу# в устной части ЕГЭ"}/>
                <div className="usesInfoContainer">
                    <div className="usesImageContrainer">
                        <img src={bannerImage} alt="usesImg" loading="lazy"/>
                    </div>
                    <div className="usesContainer">
                        {mainUses.map((item, index) => (
                            <MainUses key={`uses${index}`} usesIndex={setNumberFormat(index + 1)} usesImage={item.image} usesText={item.text}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})