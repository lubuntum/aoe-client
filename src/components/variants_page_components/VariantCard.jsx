import { useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx";

import { SERVER_API_URL } from "../../config.js";

import { setNumberFormat } from "../../modules/number_formation_modules/setNumberFormat.js";

import routes from '../../routes.js';

export const VariantCard = ({variant, index}) => {
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
                        <p><span>{setNumberFormat(index)} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                    </div>
                    <div className="cardBtns">
                        <div className="cardTasks">
                            {Array.from({length:4}, (_, index) => (
                                <Button buttonType={"alt"}
                                        buttonText={index+1}
                                        buttonFunc={()=>{navigateToTaskSession(index+1)}}/>
                            ))}
                        </div>
                        <div className="cardExam">
                            <Button buttonType={"alt"}
                                    buttonText={"Экзамен"}
                                    buttonFunc={()=>{navigate(routes.LESSON_SESSION, {state: variant})}}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}