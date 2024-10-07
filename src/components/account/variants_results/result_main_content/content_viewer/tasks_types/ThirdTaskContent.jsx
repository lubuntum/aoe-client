import "../../../css/content_viewer.css"

export const ThirdTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.task_content.task_guide}</p>
            <div className="dividerHr"></div>
            <div className="taskQuestionContainer">
                {task.task_content.task_questions.map((question, i) => (
                    <p>{`${i+1}. ${question}`}</p>
                ))}
            </div>
        </div>
    </>)
}