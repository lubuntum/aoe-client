import { useLocation } from "react-router-dom"

import { ReactComponent as Hearing } from "../../../src/res/icons/hearing_24dp_gi.svg"

import routes from "../../routes"

export const ThirdTaskContent = ({task}) => {
    const location = useLocation()

    let taskContent = location.pathname === routes.ACCOUNT ? "taskContentAccount" : "taskContentSession"
    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskDivider = location.pathname === routes.ACCOUNT ? "taskDividerAccount" : "taskDividerSession"
    let taskIcon = location.pathname === routes.ACCOUNT ? "taskIconAccount" : "taskIconSession"
    let taskQuestion = location.pathname === routes.ACCOUNT ? "taskQuestionAccount" : "taskQuestionSession"

    return (<>
        <div className={taskContent}>
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className={taskDivider}></div>
            <div className={taskIcon}>
                <Hearing className="taskIconsSvg"/>
            </div>
            <div className={taskQuestion}>
                {!task.hideQuestions && 
                    task.taskContent.questions.map((question, i) => (<p>{`${i+1}. ${question}`}</p>))
                }
            </div>
        </div>
    </>)
}