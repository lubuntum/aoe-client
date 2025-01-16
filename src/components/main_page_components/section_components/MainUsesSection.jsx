import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainUses } from "./MainUses"

import bannerImage from "../../../res/images/banner_image_education_amico.svg"

import { ReactComponent as DuckIcon } from "../../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../../res/icons/husky-svgrepo-com.svg"

export const MainUsesSection = React.memo(() => {
    const mainUses = useMemo(() => [
        {image: <DuckIcon className="svgIcon"/>, text: "Создайте аккаунт"},
        {image: <SnakeIcon className="svgIcon"/>, text: "Изучите планы по улучшению подписки"},
        {image: <CatIcon className="svgIcon"/>, text: "Пополните баланс"},
        {image: <HuskyIcon className="svgIcon"/>, text: "Начните готовится к экзаменам"}
    ], [])

    return (
        <div className="contentWrapper">
            <div className='usesWrapper'>
                <PageTitle pageTitleText={"Всего #4 шага# к началу подгтовки к ЕГЭ"}/>
                <div className="usesInfoContainer">
                    <div className="usesImageContrainer">
                        <img src={bannerImage} alt="usesImg" loading="lazy"/>
                    </div>
                    <div className="usesContainer">
                        {mainUses.map((item, index) => (
                            <MainUses key={`uses${index}`} usesIndex={index + 1} usesImage={item.image} usesText={item.text}/>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
})