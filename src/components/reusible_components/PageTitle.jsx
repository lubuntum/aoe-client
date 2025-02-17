import { useMemo } from "react"
import "./css/page_title.css"

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

export const PageTitle = ({pageTitleText, className, titleStyle = null}) => {
    const formatedText = useMemo(() => formatText(pageTitleText), [pageTitleText])
    return (
        <div className={`pageTitleContainer ${className}`}>
            <h1 style={titleStyle && titleStyle}>{formatedText}</h1>
        </div>
    )
}