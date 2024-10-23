export const ThirdTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <div className="taskQuestionContainer">
                {task.taskContent.questions.map((question, i) => (
                    <p>{`${i+1}. ${question}`}</p>
                ))}
            </div>
        </div>
    </>)
}