import { useLocation } from "react-router-dom"
import routes from "../../routes"

import { ReactComponent as Hearing } from "../../../src/res/icons/hearing_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const ThirdTaskContent = ({task}) => {
    const location = useLocation()

    let taskGuide = location.pathname === routes.ACCOUNT ? "taskGuideAccount" : "taskGudieSession"
    let taskIcon = location.pathname === routes.ACCOUNT ? "taskIconAccount" : "taskIconSession"

    return (<>
        <div className="taskContent">
            <p className={taskGuide}><span>GUIDE:</span> {task.taskContent.taskGuide}</p>
            <div className="dividerHr"></div>
            <div className={taskIcon}>
                <Hearing className="taskIconsSvg"/>
            </div>
            <div className="taskQuestionContainer">
                {!task.hideQuestions && 
                    task.taskContent.questions.map((question, i) => (
                    <p>{`${i+1}. ${question}`}</p>
                ))}
            </div>
        </div>
    </>)
}