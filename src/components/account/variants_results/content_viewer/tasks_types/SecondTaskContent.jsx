export const SecondTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <p>{task.taskContent.taskText[0]}</p>
            <div className="taskTopicContainer">
                <div>
                    {task.taskContent.topics.map((topic, i) => (
                            <p>{`${i+1}. ${topic}`}</p>
                    ))}
                </div>
                <p>{task.taskContent.taskText[1]}</p>
                <p>{task.taskContent.imgTitle}</p>
                <div className="taskImg">
                    <img src={task.taskContent.img} alt=""/>
                </div>
            </div>
            
        </div>
    </>)
}