import { useState } from "react"
import { HeaderLogo } from "../header_components/HeaderLogo"
import { NewInput } from "../reusible_components/NewInput"
import "./css/beta_test_page.css"
import { NewButton } from "../reusible_components/NewButton"

export const TestingPage = () => {
    const [betaTestEmail, setBetaTestEmail] = useState()

    const handleSubmit = () => {
        console.log(betaTestEmail)
    }

    return (
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="betaTestWrapper">
                    <div className="betaTestContainers neumorphism">
                        <HeaderLogo/>
                        <p>Присоединяйтесь к бета тестированию TestMyEng!</p>
                        <p>Мы рады представить вам наш сервис по тренировке устной части ЕГЭ по английскому языку - <span>TestMyEng!</span> Наша цель - помочь вам уверенно подготовиться к экзамену и достичь высоких результатов.</p>
                        <p>Что такое TestMyEng?</p>
                        <p>TestMyEng - Это интерактивная платформа, которая предлагает уникальные упражнения и задания для улучшения ваших навыков устной речи. Мы разработали наш сервис с учетом актуальных требований ЕГЭ, чтобы вы могли максимально эффективно подготовиться к экзамену.</p>
                        <p>Почему стоит участвовать в бета-тестировании?</p>
                        <p><span>- Эксклюзивный доступ:</span> Будьте первыми, кто опробует наш сервис и его функции.</p>
                        <p><span>- Влияние на развитие:</span> Ваши отзывы помогут нам улучшить платформу и сделать ее еще более полезной для пользователей.</p>
                        <p>Как оставить свою почту?</p>
                        <p>Просто введите свой адрес электронной почты в поле ниже, и мы уведомим вас, когда начнется бета-тестирование. Не упустите позможность стать частью нашего проекта и улучшить свои навыки английского языка!</p>
                        <div className="betaTestInputs">
                            <NewInput key={"betaTestInput"}
                                      inputValue={betaTestEmail}
                                      inputType={"text"}
                                      inputPlaceholder={"Электронная почта"}
                                      inputOnChange={(e) => {setBetaTestEmail(e.target.value)}}/>
                            <NewButton key={"betaTestButton"}
                                       buttonText={"Отправить"}
                                       buttonFunc={handleSubmit}/>
                        </div>
                        <p>С уважением,</p>
                        <p>Команда поддержки TestMyEng.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}