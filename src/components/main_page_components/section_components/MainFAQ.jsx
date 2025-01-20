import React from "react"

export const MainFAQ = React.memo(({iterator, question, answer}) => {
    return (<>
        <details className="accordionDetails" name="faq">
            <summary className="accrodionSummary">
                <span className="accordionTitle" role="term" aria-details={`faq${iterator}`}>
                    <span>{iterator}</span> {question}
                </span>
            </summary>
        </details>
        <div className="accordionContent" id={`faq${iterator}`} role="definition">
            <div className="accordionAnswer">
                {answer}
            </div>
        </div>
    </>)
})