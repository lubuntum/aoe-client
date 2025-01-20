import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainFAQ } from "./MainFAQ"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

export const MainFAQSection = React.memo(() => {
    const faqData = useMemo(() => [
        {
            question: "Зачем нужна подписка?",
            answer: "Ответ 1"
        },
        {
            question: "Могу ли я отправить пройденный вариант своему учителю?",
            answer: "Ответ 2"
        },
        {
            question: "Как получить подробные комментарии по пройденному варианту?",
            answer: "Ответ 3"
        },
        {
            question: "Можно просто проходить варианты без проверки?",
            answer: "Ответ 4"
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