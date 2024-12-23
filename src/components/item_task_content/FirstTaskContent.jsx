import { useLocation } from "react-router-dom"

import routes from "../../routes"

export const FirstTaskContent = ({task}) => {
    const location = useLocation()

    let taskContent = location.pathname === routes.ACCOUNT ? "taskContentAccount" : "taskContentSession"
    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskDivider = location.pathname === routes.ACCOUNT ? "taskDividerAccount" : "taskDividerSession"
    let taskText = location.pathname === routes.ACCOUNT ? "taskTextAccount" : "taskTextSession"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className={taskDivider}></div>
            <p className={taskText}>{task.taskContent.taskText}</p>
        </div>
    </>)
}