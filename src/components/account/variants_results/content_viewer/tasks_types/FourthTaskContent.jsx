export const FourthTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.task_content.task_guide}</p>
            <div className="dividerHr"></div>
            <div className="taskSubContainer">
                <div>
                    {task.task_content.task_sub.map(sub => (
                        <p>{`- ${sub}`}</p>
                    ))}
                </div>
                <div className="taskImgs">
                    <div className="taskImg">
                        <img src={task.task_content.task_img1} alt=""/>
                    </div>
                    <div className="taskImg">
                        <img src={task.task_content.task_img2} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}