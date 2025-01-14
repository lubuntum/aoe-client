import "./css/page_title.css"

export const PageTitle = ({pageTitleText, className}) => {
    const formatText = (text) => {
        const regex = /#(.*?)#/g
        const parts = text.split(regex)
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <span key={index}>{part}</span>
            }
            return part
        })
    }

    return (<>
        <div className={`pageTitleContainer ${className}`}>
            <h1>{formatText(pageTitleText)}</h1>
        </div>
    </>)
}