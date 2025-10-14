import "./css/accordion_style.css"

export const Accordion = ({summary, content, isConnected}) => {
    return (<>
        <details name={`${isConnected ? "connected_true" : ""}`}>
            <summary>{summary}</summary>

            <p>{content}</p>
        </details>
    </>)
}