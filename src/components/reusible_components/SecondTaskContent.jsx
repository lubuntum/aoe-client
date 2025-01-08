import { useLocation } from "react-router-dom"

import { SERVER_API_URL } from "../../config"

import routes from "../../routes"

export const SecondTaskContent = ({task}) => {
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
    let taskTopic = 
        location.pathname === routes.ACCOUNT ? "taskTopicAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskTopicScenario" : 
        "taskTopicResult"
    let taskUnderTopic = 
        location.pathname === routes.ACCOUNT ? "taskUnderTopicAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskUnderTopicScenario" : 
        "taskUnderTopicResult"
    let taskImg = 
        location.pathname === routes.ACCOUNT ? "taskImgAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskImgScenario" : 
        "taskImgResult"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide} ({task.taskContent.taskText[1]})</p>
            <div className={taskDivider}></div>
            <p className={taskText}>{task.taskContent.taskText[0]}</p>
            <div className={taskTopic}>
                {task.topicNumber === undefined && task.taskContent.topics.map((topic, i) => (
                    <p>{`${i+1}. ${topic}`}</p>))}
                {task.topicNumber !== undefined && <p>{`${task.topicNumber+1}. ${task.taskContent.topics[task.topicNumber]}`}</p>}
            </div>

            <div className={taskUnderTopic}>
                <div className={taskImg}>
                    <img src={`${SERVER_API_URL}/${task.taskContent.img}`} alt=""/>
                </div>
                <p>{task.taskContent.imgTitle}</p>
            </div>
        </div>
    </>)
}