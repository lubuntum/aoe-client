import React, { useMemo } from "react"

import { PageTitle } from "../../reusible_components/PageTitle"
import { MainFAQ } from "./MainFAQ"

export const MainFAQSection = React.memo(() => {
    const faqData = useMemo(() => [
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
    ], [])

    return (
        <div className="contentWrapper">
            <div className='faqWrapper'>
                <PageTitle pageTitleText={"Ответим на #частые вопросы#"}/>
                <div className="faqContainer">
                    {faqData.map((item, index) => (
                        <MainFAQ key={`faq${index}`} iterator={index+1} question={item.question} answer={item.answer}/>
                    ))}
                </div>
            </div>
        </div>
    )
})