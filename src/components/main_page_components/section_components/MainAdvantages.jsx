import React, { useMemo } from "react"

const formatText = (text) => {
    const regex = /#(.*?)#/g
    const parts = text.split(regex)
    return parts.map((item, index) => {
        if (index % 2 === 1) {
            return <span key={index}>{item}</span>
        }
        return item
    })
}

export const MainAdvantages = React.memo(({advantageImage, advantageText}) => {
    const formatedText = useMemo(() => formatText(advantageText), [advantageText])
    return (
        <div className="advantageCard">
            <div className="advantageCardImage">
                {advantageImage}
            </div>
            <div className="advantageCardText">
                <p>{formatedText}</p>
            </div>
        </div>
    )
})