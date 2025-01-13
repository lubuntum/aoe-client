import "../../App.css"
import "./css/main.css"

import bannerImage from "../../res/images/banner_image_education_amico.svg"
import baseBackground from "../../res/images/base_subscription_background.png"
import proBackground from "../../res/images/pro_subscription_background.png"
import { ReactComponent as DuckIcon } from "../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../res/icons/bat-svgrepo-com.svg"
import { ReactComponent as ChameleonIcon } from "../../res/icons/chameleon-svgrepo-com.svg"

import { HeaderMain } from '../header_components/HeaderMain'
import { MainAdvantages } from "./MainAdvantages"
import { MainUses } from "./MainUses"
import { PricingSubscriptionCard } from "../pricing_page_components/PricingSubscriptionCard"
import { MainFAQ } from "./MainFAQ"
import { Button } from "../reusible_components/Button"
import { PageTitle } from "../reusible_components/PageTitle"
import { useState } from "react"

export const MainPage = () => {
    const baseDescription = ["План доступен после регистрации", 
                             "Моментальный доступ к 5 вариантам", 
                             "Хранение результатов в течении 24 часов"]
                             
    const proDescription = ["Моментальный доступ ко всем 50+ вариантам", 
                            "Хранение результатов пока активна подписка", 
                            "Приветственный баланс на 1 проверку"]

    const faqData = [
        {
            question: "Вопрос 1",
            answer: "Ответ 1"
        },
        {
            question: "Вопрос 2",
            answer: "Ответ 2"
        },
        {
            question: "Вопрос 3",
            answer: "Ответ 3"
        },
        {
            question: "Вопрос 4",
            answer: "Ответ 4"
        },
    ]

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId)
        if (section) {
            const offset = sectionId === "section0" ? 20 : 0
            const sectionTop = section.getBoundingClientRect().top + window.scrollY
            window.scrollTo({
                top: sectionTop - offset,
                behavior: "smooth"
            })
        }
    }

    return (<>
        <HeaderMain onScrollToSection={scrollToSection}/>
        <div className="mainContentContainer">
            <div id="section0" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='bannerWrapper'>
                        <div className="bannerContainer">
                            <div className="bannerInfoContainer">
                                <h1>Lorem ipsum dolor <span>sit amet</span> consectetur, adipisicing elit.</h1>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa explicabo cum accusantium repellendus impedit dignissimos aperiam labore sapiente voluptatum necessitatibus quas, ipsa corporis doloribus nemo, odit praesentium vel fugit quo deserunt voluptatibus laborum voluptates illo odio? Excepturi mollitia autem, quae accusamus in reiciendis deleniti quisquam suscipit voluptates beatae magnam consequuntur voluptas ipsam sint iste. Est incidunt labore sunt sequi officia!</p>
                                <Button buttonType={""}
                                        buttonPadding={"0 20px"}
                                        buttonWidth={"300px"}
                                        buttonHeight={""}
                                        buttonIcon={""}
                                        buttonText={"Пройти пробные варианты"}
                                        buttonFunc={()=>{}}/>
                            </div>
                            <div className="bannerImageContainer">
                                <img src={bannerImage} alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section1" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='advantagesWrapper'>
                        <PageTitle pageTitleText={"6 плюсов которое помогут Вам лучше подготовиться к экзамену"}/>
                        <div className="advantagesContainer">
                            <MainAdvantages advantageImage={<DuckIcon className="svgIcon"/>} advantageText={"Первое наименование"}/>
                            <MainAdvantages advantageImage={<SnakeIcon className="svgIcon"/>} advantageText={"Второе наименование"}/>
                            <MainAdvantages advantageImage={<CatIcon className="svgIcon"/>} advantageText={"Третье наименование"}/>
                            <MainAdvantages advantageImage={<HuskyIcon className="svgIcon"/>} advantageText={"Четвертое наименование"}/>
                            <MainAdvantages advantageImage={<BatIcon className="svgIcon"/>} advantageText={"Пятое наименование"}/>
                            <MainAdvantages advantageImage={<ChameleonIcon className="svgIcon"/>} advantageText={"Шестое наименование"}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section2" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='usesWrapper'>
                        <PageTitle pageTitleText={"Всего 4 шага к началу подгтовки к ЕГЭ"}/>
                        <div className="usesInfoContainer">
                            <div className="usesImageContrainer">
                                <img src={bannerImage} alt=""/>
                            </div>
                            <div className="usesContainer">
                                <MainUses usesImage={<DuckIcon className="svgIcon"/>} usesText={"Создайте аккаунт"} usesIndex={"01"}/>
                                <MainUses usesImage={<SnakeIcon className="svgIcon"/>} usesText={"Изучите планы по улучшению подписки"} usesIndex={"02"}/>
                                <MainUses usesImage={<CatIcon className="svgIcon"/>} usesText={"Пополните баланс"} usesIndex={"03"}/>
                                <MainUses usesImage={<HuskyIcon className="svgIcon"/>} usesText={"Начните готовится к экзаменам"} usesIndex={"04"}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section3" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='subscriptionAdvantagesWrapper'>
                        <PageTitle pageTitleText={"Преимущества улучшеной подписки"}/>
                        <div className="subscriptionAdvantagesContainer">
                            <PricingSubscriptionCard className={""}
                                                     contentSwap={false}
                                                     subscriptionType={"base"}
                                                     subscriptionName={"Базовый план"}
                                                     subscriptionDescription={baseDescription}
                                                     subscriptionIsActive={"Активен"}
                                                     subscriptionBG={baseBackground}/>
                            <PricingSubscriptionCard className={""}
                                                     contentSwap={true}
                                                     subscriptionType={"pro"}
                                                     subscriptionName={"Улучшеный план"}
                                                     subscriptionDescription={proDescription}
                                                     subscriptionIsActive={"Активен"}
                                                     subscriptionBG={proBackground}/>
                        </div>
                    </div>
                </div>
            </div>
            <div id="section4" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='partnersWrapper'>
                        <PageTitle pageTitleText={"Наши партнеры"}/>
                    </div>
                </div>
            </div>
            <div id="section5" className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='faqWrapper'>
                        <PageTitle pageTitleText={"Ответим на частые вопросы"}/>
                        <div className="faqContainer">
                            {faqData.map((item, index) => (
                                <MainFAQ iterator={index+1} question={item.question} answer={item.answer}/>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}