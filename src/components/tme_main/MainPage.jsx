import "./main_style.css"

import { useNavigate } from "react-router-dom"

import routes from "../../routes.js"
import { Header } from "../tme_header/Header"
import { Footer } from "../tme_footer/Footer"
import { Btn } from "../tme_reusable/Btn"


export const MainPage = () => {
    const navigate = useNavigate()

    return (<>
        <Header/>
        
        <div className="content_wrapper">
            <div className="main_page_wrapper">

                <section className="main_banner_section">
                    <h1>Сервис подготовки к устной части ЕГЭ<br/>по английскому языку</h1>

                    <h4>Наш сервис создает атмосферу настоящего экзамена, помогая тебе уверенно чувствовать себя на ЕГЭ.<br/>Улучшай свои навыки говорения и добивайся максимальных результатов ЕГЭ вмести с нами!</h4>

                    <div className="main_banner_info_container">
                        <div className="main_banner_info_item">
                            <h1>30</h1>
                            <h4>Вариантов</h4>
                            <p>тебе будет доступно после регистрации. Незарегестрированному пользователю доступно лишь 5 вариантов для прохождения</p>
                        </div>

                        <div className="main_banner_info_divider"></div>

                        <div className="main_banner_info_item">
                            <h1>AI</h1>
                            <h4>Искусственный интеллект</h4>
                            <p>мы проверяем ответы с помощью современных ИИ. Проверка занимает не более 10 минут, а точность оценки составляет 85 - 90%</p>
                        </div>

                        <div className="main_banner_info_divider"></div>

                        <div className="main_banner_info_item">
                            <h1>200</h1>
                            <h4>Стоимость проверки</h4>
                            <p>тариф 1 проверки экзамена составляет 200 рублей. Проверка варианта по отдельности (по 1 заданию) составляет 50 рублей</p>
                        </div>
                    </div>

                    <div className="main_banner_buttons">
                        <Btn btnText={"Варианты ОГЭ"} btnFunc={()=>navigate(routes.TASK)} btnDis={true}/>
                        <Btn btnText={"Варианты ЕГЭ"} btnFunc={()=>navigate(routes.TASK)}/>
                    </div>
                </section>

                <section className="main_advantages_section">
                    <h1>Преимущества нашего сервиса</h1>

                </section>

                <section className="main_guide_section">
                    <h1>Всего несколько шагов на пути к<br/>максимальному баллу в устной части ЕГЭ</h1>

                </section>

                <section className="main_faq_section">
                    <h1>Ответим на часто задаваемые вопросы</h1>
                    
                </section>

            </div>
        </div>

        <Footer/>
    </>)
}