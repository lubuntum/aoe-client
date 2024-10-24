import { SERVER_API_URL } from "../../../../../config"

export const FourthTaskContent = ({task}) => {
    return (<>
        <div className="taskContent">
            <p><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <p>{task.taskContent.taskText[0]}</p>
            <div className="taskSubContainer">
                <div>
                    {task.taskContent.subTasks.map(sub => (
                        <p>{`- ${sub}`}</p>
                    ))}
                </div>
            <p>{task.taskContent.taskText[1]}</p>
                <div className="taskImgs">
                    <div className="taskImg">
                        <img src={`${SERVER_API_URL}/${task.taskContent.firstImg}`} alt=""/>
                    </div>
                    <div className="taskImg">
                        <img src={`${SERVER_API_URL}/${task.taskContent.secondImg}`} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}