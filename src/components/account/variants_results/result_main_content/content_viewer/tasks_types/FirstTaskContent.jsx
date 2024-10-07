import "../../../css/content_viewer.css"

export const FirstTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.task_content.task_guide}</p>
            <p>{task.task_content.task_text}</p>
        </div>
    </>)
}