export const FirstTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <p>{task.taskContent.taskText[0]}</p>
        </div>
    </>)
}