import { useLocation } from "react-router-dom"

import { SERVER_API_URL } from "../../config"

import routes from "../../routes"

export const FourthTaskContent = ({task}) => {
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
    let taskSubQuestion = 
        location.pathname === routes.ACCOUNT ? "taskSubQuestionAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskSubQuestionScenario" : 
        "taskSubQuestionResult"
    let taskImgs = 
        location.pathname === routes.ACCOUNT ? "taskImgsContainerAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskImgsContainerScenario" : 
        "taskImgsContainerResult"
    let taskImg = 
        location.pathname === routes.ACCOUNT ? "taskImgAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskImgScenario" : 
        "taskImgResult"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide} ({task.taskContent.taskText[1]})</p>
            <div className={taskDivider}></div>
            <p className={taskText}>{task.taskContent.taskText[0]}</p>
            <div className={taskSubQuestion}>
                {task.taskContent.subTasks.map(sub => (
                    <p>{`- ${sub}`}</p>
                ))}
            </div>
            <div className={taskImgs}>
                <div className={taskImg}>
                    <img src={`${SERVER_API_URL}/${task.taskContent.firstImg}`} alt=""/>
                </div>
                <div className={taskImg}>
                    <img src={`${SERVER_API_URL}/${task.taskContent.secondImg}`} alt=""/>
                </div>
            </div>
        </div>
    </>)
}