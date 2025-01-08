import "./css/task_viewer_account.css"
import "./css/task_viewer_scenario.css"
import "./css/task_viewer_result.css"

import { useLocation } from "react-router-dom"
import routes from "../../routes"

export const FirstTaskContent = ({task}) => {
    const location = useLocation()

    let taskContent = 
        location.pathname === routes.ACCOUNT ? "taskContentAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskContentScenario" :
        "taskContentResult"
    let taskGuide = 
        location.pathname === routes.ACCOUNT ? "taskGuideAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskGuideScenario" :
        "taskGuideResult"
    let taskDivider = 
        location.pathname === routes.ACCOUNT ? "taskDividerAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskDividerScenario" :
        "taskDividerResult"
    let taskText = 
        location.pathname === routes.ACCOUNT ? "taskTextAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskTextScenario" :
        "taskTextResult"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className={taskDivider}></div>
            <p className={taskText}>{task.taskContent.taskText}</p>
        </div>
    </>)
}