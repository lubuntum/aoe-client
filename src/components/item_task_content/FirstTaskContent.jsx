import { useLocation } from "react-router-dom"
import routes from "../../routes"

export const FirstTaskContent = ({task}) => {
    const location = useLocation()

    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskText = location.pathname === routes.ACCOUNT ? "taskTextAccount" : "taskTextSession"

    return (<>
        <div className="taskContent">
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <p className={taskText}>{task.taskContent.taskText[0]}</p>
        </div>
    </>)
}