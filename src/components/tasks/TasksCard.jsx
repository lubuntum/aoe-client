import { useNavigate } from "react-router-dom"
import routes from '../../routes';
import { SERVER_API_URL } from "../../config";
export const TasksCard = ({variant, index}) => {
    const navigate = useNavigate()
    const navigateToTaskSession = (taskType) => {
        variant.pickedTaskType = taskType
        navigate(routes.LESSON_SESSION, {state: variant})
    }
    return (<>
        <div className="cardContainer">
            <div className="cardImg">
                <img src={`${SERVER_API_URL}/${variant.imagePath}`} alt=""/>
            </div>
            <div className="cardContentWrapper">
                <div className="cardContent">
                    <div className="cardTitle">
                        <p><span>{index} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                    </div>
                    <div className="cardBtns">
                        <div className="cardTasks">
                            {Array.from({length:4}, (_, index) => (
                                <a className="defBtn altBtn" onClick={() => {navigateToTaskSession(index+1)}}>{index+1}</a>
                            ))}
                        </div>
                        <div className="cardExam">
                            <a className="defBtn altBtn" onClick={() => {navigate(routes.LESSON_SESSION, {state: variant})}}>Экзамен</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}