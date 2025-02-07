import React, { useMemo } from "react"

import { useAuth } from "../../../modules/auth_modules/AuthProvider"
import { useNavigate } from "react-router-dom"
import routes from "../../../routes"

import { Button } from "../../reusible_components/Button"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainAdvantages } from "./MainAdvantages"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

import { ReactComponent as DuckIcon } from "../../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../../res/icons/bat-svgrepo-com.svg"

export const MainAdvantagesSection = React.memo(() => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    const mainAdvantages = useMemo(() => [
        {
            image: <DuckIcon className="svgIcon"/>, 
            name: "Cоответствие реальному формату ЕГЭ",
            desc: "Наши задания точно повторяют формат реального экзамена, помогая тебе адаптироваться и снизить тревожность"
        },
        {
            image: <SnakeIcon className="svgIcon"/>, 
            name: "Мгновенная обратная связь",
            desc: "После выполнения заданий ты сразу узнаешь свои баллы, что помогает выявить слабые места и улучшить свои навыки"
        },
        {
            image: <HuskyIcon className="svgIcon"/>, 
            name: "Большой выбор оригинальных вариантов",
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
                        <MainAdvantages key={`adv${index}`} iterator={setNumberFormat(index + 1)} advantageImage={item.image} advantageName={item.name} advantageDescription={item.desc}/>
                    ))}
                </div>
                {!isAuth && 
                <div className="advantageButton">
                    <Button key={"AdvantagesButton1"}
                            buttonText={"Регистрация"}
                            buttonFunc={()=>navigate(routes.AUTORIZATION)}
                            buttonWidth={"200px"}/>
                </div>}
            </div>
        </div>
    )
})