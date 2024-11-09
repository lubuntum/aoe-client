import { useLocation } from "react-router-dom"
import routes from "../../routes"

import { SERVER_API_URL } from "../../config"

export const FourthTaskContent = ({task}) => {
    const location = useLocation()

    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskText = location.pathname === routes.ACCOUNT ? "taskTextAccount" : "taskTextSession"
    let taskSubQuestion = location.pathname === routes.ACCOUNT ? "taskSubQuestionAccount" : "taskSubQuestionSession"

    return (<>
        <div className="taskContent">
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide} ({task.taskContent.taskText[1]})</p>
            <div className="dividerHr"></div>
            <p className={taskText}>{task.taskContent.taskText[0]}</p>
            <div className="taskSubContainer">
                <div className={taskSubQuestion}>
                    {task.taskContent.subTasks.map(sub => (
                        <p>{`- ${sub}`}</p>
                    ))}
                </div>
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