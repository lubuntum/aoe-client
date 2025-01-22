import React from "react"

import { Button } from "../../reusible_components/Button"

import bannerImage from "../../../res/images/banner_image_education_amico.svg"
import { useAuth } from "../../../modules/auth_modules/AuthProvider"
import { useNavigate } from "react-router-dom"
import routes from "../../../routes"

export const MainBannerSection = React.memo(() => {
    const { isAuth } = useAuth()
    const navigate = useNavigate()

    return (
        <div className="contentWrapper">
            <div className='bannerWrapper'>
                <div className="bannerContainer">
                    <div className="bannerInfoContainer">
                        <h1><span>Test</span>MyEng - сервис подготовки к устной части ЕГЭ по английскому языку</h1>
                        <p>Наш сервис создает атмосферу <span>настоящего экзамена</span>, 
                        помогая тебе <span>уверенно</span> чувствовать себя на ЕГЭ. 
                        Ты сможешь потренироваться в условиях, 
                        максимально приближенных к реальному тестированию, 
                        и сразу узнать свой балл. 
                        А если хочешь получить развернутую обратную связь, 
                        обращайся к нашим <span>экспертам!</span><br/><br/>
                        <span>Улучшай</span> свои навыки говорения и добивайся <span>максимальных</span> результатов ЕГЭ вместе с <span>Testmyeng!</span></p>
                        {!isAuth ?
                            <Button key={"mainBannerTest0"}
                                    buttonType={"testVariants"}
                                    buttonPadding={"0 20px"}
                                    buttonText={"Зарегистрироваться"}
                                    buttonFunc={()=>navigate(routes.AUTORIZATION)}/> :
                            <Button key={"mainBannerTest1"}
                                    buttonType={"testVariants"}
                                    buttonPadding={"0 20px"}
                                    buttonText={"Пройти пробные варианты"}
                                    buttonFunc={()=>navigate(routes.TASK)}/>}
                    </div>
                    <div className="bannerImageContainer">
                        <img src={bannerImage} alt="bannerImg" loading="lazy"/>
                    </div>
                </div>
            </div>
        </div>
    )
})