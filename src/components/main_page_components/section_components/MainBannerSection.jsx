import React from "react"

import { Button } from "../../reusible_components/Button"

import { useAuth } from "../../../modules/auth_modules/AuthProvider"
import { useNavigate } from "react-router-dom"
import routes from "../../../routes"

export const MainBannerSection = React.memo(() => {
    const navigate = useNavigate()
    const { isAuth } = useAuth()
    return (
        <div className="contentWrapper">
            <div className='bannerWrapper'>
                <div className="bannerContainer">
                    <div className="bannerContainerItem bannerItem1">
                        <p>TestMy<span>Eng</span></p>
                        <p>Сервис подготовки к устной части ЕГЭ по английскому языку</p>
                        <div className="bannerItem1Decal bannerDecal"></div>
                    </div>
                    <div className="bannerContainerItem bannerItem2">
                        <p>50+</p>
                        <p>Вариантов для тренировки</p>
                    </div>
                    <div className="bannerContainerItem bannerItem3">
                        <div className="magicpattern"></div>
                        <div className="bannerItem3Decal1 bannerDecal"></div>
                        <div className="bannerItem3Decal2 bannerDecal"></div>
                    </div>
                    <div className="bannerContainerItem bannerItem4">
                        <div className="bannerItem4Cell1">
                            <div className="bannerItem4Decal1 bannerDecal"></div>
                        </div>
                        <div className="bannerItem4Cell2">

                        </div>
                        <div className="bannerItem4Cell3">
                            <div className="bannerItem4Decal2 bannerDecal"></div>
                        </div>
                        <div className="bannerItem4Cell4">
                            <div className="bannerItem4Decal3 bannerDecal"></div>
                        </div>
                    </div>
                    <div className="bannerContainerItem bannerItem5">
                        <div className="bannerItem5Decal1 bannerDecal"></div>
                        <p>Наш сервис создает атмосферу <span>настоящего экзамена</span>, 
                        помогая тебе <span>уверенно</span> чувствовать себя на ЕГЭ. 
                        Ты сможешь потренироваться в условиях, 
                        максимально приближенных к реальному тестированию, 
                        и <span>сразу</span> узнать свой балл. 
                        А если хочешь получить развернутую обратную связь, 
                        обращайся к нашим <span>экспертам!</span></p>
                        <p><span>Улучшай</span> свои навыки говорения и добивайся <span>максимальных</span> результатов ЕГЭ вместе с <span>TestMyEng!</span></p>
                        {isAuth ? 
                        <Button key={"BannerButton0"}
                                buttonText={"К списку вариантов"}
                                buttonType={"outline"}
                                buttonFunc={()=>navigate(routes.TASK)}
                                buttonWidth={"250px"}/> : 
                        <Button key={"BannerButton1"}
                                buttonText={"Регистрация"}
                                buttonFunc={()=>navigate(routes.AUTORIZATION)}
                                buttonWidth={"200px"}/>}
                    </div>
                </div>
            </div>
        </div>
    )
})