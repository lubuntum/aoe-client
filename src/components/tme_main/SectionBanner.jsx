import { useNavigate } from "react-router-dom"
import { Btn } from "../tme_reusable/Btn"
import routes from "../../routes.js"

export const SectionBanner = () => {
    const navigate = useNavigate()

    return (<>
        <section className="main_banner_section" id="main_banner_section">
            <h1>Сервис подготовки к устной части ЕГЭ по английскому языку</h1>
            
            <h4>Наш сервис создает атмосферу настоящего экзамена, помогая тебе уверенно чувствовать себя на ЕГЭ. Улучшай свои навыки говорения и добивайся максимальных результатов ЕГЭ вмести с нами!</h4>

            <div className="main_banner_info_container">
                <div className="main_banner_info_item">
                    <div>
                        <h2>30</h2>
                        <p>Вариантов</p>
                    </div>
                    <p>тебе будет доступно после регистрации. Незарегестрированному пользователю доступно лишь 5 вариантов для прохождения</p>
                </div>

                <div className="main_banner_info_divider"></div>

                <div className="main_banner_info_item">
                    <div>
                        <h2>AI</h2>
                        <p>Искусственный интеллект</p>
                    </div>
                    <p>мы проверяем ответы с помощью современных ИИ. Проверка занимает не более 10 минут, а точность оценки составляет 85 - 90%</p>
                </div>

                <div className="main_banner_info_divider"></div>

                <div className="main_banner_info_item">
                    <div>
                        <h2>200</h2>
                        <p>Стоимость проверки</p>
                    </div>
                    <p>тариф 1 проверки экзамена составляет 200 рублей. Проверка варианта по отдельности (по 1 заданию) составляет 50 рублей</p>
                </div>
            </div>

            <div className="main_banner_buttons">
                <Btn btnText={"Варианты ОГЭ"} btnFunc={()=>navigate(routes.TASK)} btnDis={true}/>
                <Btn btnText={"Варианты ЕГЭ"} btnFunc={()=>navigate(routes.TASK)}/>
            </div>
        </section>
    </>)
}