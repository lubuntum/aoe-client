import { useNavigate } from "react-router-dom"
import routes from '../../routes';
export const TasksCard = ({variant, index}) => {
    const navigate = useNavigate()
    return (<>
        <div className="cardContainer">
            <div className="cardImg">
                <img src="https://img.freepik.com/free-photo/view-lynx-animals-wild_23-2150374914.jpg?t=st=1729166295~exp=1729169895~hmac=5b1c1876ac35fb8db6f1f9f053910b1d914a680510e7e4e0801c2fd1e4e23559&w=1380" alt=""/>
            </div>
            <div className="cardContent">
                <div className="cardTitle">
                    <p><span>{index} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                </div>
                <div className="cardBtns">
                    <div className="cardTasks">
                        <a className="btn" onClick={() => {}}>1</a>
                        <a className="btn" onClick={() => {}}>2</a>
                        <a className="btn" onClick={() => {}}>3</a>
                        <a className="btn" onClick={() => {}}>4</a>
                    </div>
                    <div className="cardExam">
                        <a className="btn" onClick={() => {navigate(routes.LESSON_SESSION, {state: variant})}}>Экзамен</a>
                    </div>
                </div>
            </div>
        </div>
    </>)
}