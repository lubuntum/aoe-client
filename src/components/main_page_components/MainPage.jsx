import "../../App.css"
import "./css/main.css"

import bannerImage from "../../res/images/banner_image_education_amico.svg"
import { ReactComponent as DuckIcon } from "../../res/icons/duck-svgrepo-com.svg"
import { ReactComponent as SnakeIcon } from "../../res/icons/snake-svgrepo-com.svg"
import { ReactComponent as CatIcon } from "../../res/icons/cat-svgrepo-com.svg"
import { ReactComponent as HuskyIcon } from "../../res/icons/husky-svgrepo-com.svg"
import { ReactComponent as BatIcon } from "../../res/icons/bat-svgrepo-com.svg"
import { ReactComponent as ChameleonIcon } from "../../res/icons/chameleon-svgrepo-com.svg"

import { HeaderMain } from '../header_components/HeaderMain'
import { MainAdvantages } from "./MainAdvantages"
import { MainUses } from "./MainUses"
import { Button } from "../reusible_components/Button"
import { PageTitle } from "../reusible_components/PageTitle"

export const MainPage = () => {
    return (<>
        <HeaderMain/>
        <div className="mainContentContainer">
            <div className='sectionWrapper'>
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
            <div className='sectionWrapper'>
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
            <div className='sectionWrapper'>
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
            <div className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='subscriptionAdvantagesWrapper'>
                        <PageTitle pageTitleText={"Преимущества улучшеной подписки"}/>
                    </div>
                </div>
            </div>
            <div className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='partnersWrapper'>
                        <PageTitle pageTitleText={"Наши партнеры"}/>
                    </div>
                </div>
            </div>
            <div className='sectionWrapper'>
                <div className="contentWrapper">
                    <div className='faqWrapper'>
                        <PageTitle pageTitleText={"Ответим на частые вопросы"}/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}