import "../../../css/content_viewer.css"

export const FirstTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.task_content.task_guide}</p>
            <div className="dividerHr"></div>
            <p>{task.task_content.task_text}</p>
        </div>
    </>)
}