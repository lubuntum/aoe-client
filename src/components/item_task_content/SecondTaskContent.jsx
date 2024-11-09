import { useLocation } from "react-router-dom"
import routes from "../../routes"

import { SERVER_API_URL } from "../../config"

export const SecondTaskContent = ({task}) => {
    const location = useLocation()

    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskText = location.pathname === routes.ACCOUNT ? "taskTextAccount" : "taskTextSession"
    let taskTopic = location.pathname === routes.ACCOUNT ? "taskTopicAccount" : "taskTopicSession"
    let taskImgContainer = location.pathname === routes.ACCOUNT ? "taskImgContainerAccount" : "taskImgContainerSession"

    return (<>
        <div className="taskContent">
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide} ({task.taskContent.taskText[1]})</p>
            <div className="dividerHr"></div>
            <div className="taskTopicContainer">
                <p className={taskText}>{task.taskContent.taskText[0]}</p>
                <div className={taskTopic}> 
                    {task.topicNumber === undefined && task.taskContent.topics.map((topic, i) => (
                        <p>{`${i+1}. ${topic}`}</p>))}
                    {task.topicNumber !== undefined && <p>{`${task.topicNumber+1}. ${task.taskContent.topics[task.topicNumber]}`}</p>}
                </div>
                <div className={taskImgContainer}>
                    <div className="taskImg">
                        <img src={`${SERVER_API_URL}/${task.taskContent.img}`} alt=""/>
                    </div>
                    <p>{task.taskContent.imgTitle}</p>
                </div>
            </div>
        </div>
    </>)
}