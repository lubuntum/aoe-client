import "./css/empty_container.css"

export const EmptyContainer = ({emptyText, className}) => {
    return (<>
        <div className={`emptyContainer ${className}`}>{emptyText}</div>
    </>)
}