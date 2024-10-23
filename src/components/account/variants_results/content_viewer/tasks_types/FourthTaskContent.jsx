export const FourthTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <div className="taskSubContainer">
                <div>
                    {task.taskContent.taskSub.map(sub => (
                        <p>{`- ${sub}`}</p>
                    ))}
                </div>
                <div className="taskImgs">
                    <div className="taskImg">
                        <img src={task.taskContent.taskImg1} alt=""/>
                    </div>
                    <div className="taskImg">
                        <img src={task.taskContent.taskImg2} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}