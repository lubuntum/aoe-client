import "./css/page_title.css"

export const PageTitle = ({pageTitleText, className}) => {
    return (<>
        <div className={`pageTitleContainer ${className}`}>
            <h1>{pageTitleText}</h1>
        </div>
    </>)
}