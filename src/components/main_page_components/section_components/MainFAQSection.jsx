import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainFAQ } from "./MainFAQ"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

export const MainFAQSection = React.memo(() => {
    const faqData = useMemo(() => [
        {
            question: "Зачем нужна подписка?",
            answer: "Подписка открывает полный доступ ко всем доступным вариантам и заданиям. Ваши выполненные задания будут храниться до окончания срока подписки, позволяя скачивать или делиться ссылками на записи в любой момент."
        },
        {
            question: "Могу ли я отправить пройденный вариант своему учителю?",
            answer: "Безусловно! Вы можете отправить ссылку на пройденный вариант или скачать запись и передать её своему педагогу."
        },
        {
            question: "Как получить подробные комментарии по пройденному варианту?",
            answer: "Чтобы получить развернутые комментарии, закажите экспертную проверку. Наши эксперты ЕГЭ проведут оценку в течение 1–2 дней. В результате вы узнаете свои баллы, получите расшифровку оценок и ценные советы по улучшению результатов."
        },
        {
            question: "Можно просто проходить варианты без проверки?",
            answer: "Да, конечно. Оформив подписку, вы сможете практиковать любые темы, выполняя задания. После завершения ваш результат сохраняется, и вы сможете прослушать выполненные задания."
        },
    ], [])

    return (
        <div className="contentWrapper">
            <div className='faqWrapper'>
                <PageTitle pageTitleText={"Ответим на #частые вопросы#"}/>
                <div className="faqContainer">
                    {faqData.map((item, index) => (
                        <MainFAQ key={`faq${index}`} iterator={setNumberFormat(index + 1)} question={item.question} answer={item.answer}/>
                    ))}
                </div>
            </div>
        </div>
    )
})