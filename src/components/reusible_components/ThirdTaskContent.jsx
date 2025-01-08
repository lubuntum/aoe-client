import { useLocation } from "react-router-dom"

import { ReactComponent as Hearing } from "../../../src/res/icons/hearing_24dp_gi.svg"

import routes from "../../routes"

export const ThirdTaskContent = ({task}) => {
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
    let taskIcon = 
        location.pathname === routes.ACCOUNT ? "taskIconAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskIconScenario" : 
        "taskIconResult"
    let taskQuestion = 
        location.pathname === routes.ACCOUNT ? "taskQuestionAccount" :
        location.pathname === routes.LESSON_SESSION ? "taskQuestionScenario" : 
        "taskQuestionResult"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className={taskDivider}></div>
            <div className={taskIcon}>
                <Hearing className="svgIcon"/>
            </div>
            <div className={taskQuestion}>
                {!task.hideQuestions && 
                    task.taskContent.questions.map((question, i) => (<p>{`${i+1}. ${question}`}</p>))
                }
            </div>
        </div>
    </>)
}