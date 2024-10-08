export const SecondTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.task_content.task_guide}</p>
            <div className="dividerHr"></div>
            <div className="taskTopicContainer">
                <div>
                    {task.task_content.task_topics.map((topic, i) => (
                            <p>{`${i+1}. ${topic}`}</p>
                    ))}
                </div>
                <div className="taskImg">
                    <img src={task.task_content.task_img} alt=""/>
                </div>
            </div>
        </div>
    </>)
}