import { useNavigate } from "react-router-dom"

import { Button } from "../reusible_components/Button.jsx";
import { Loader } from "../reusible_components/Loader.jsx";

import { SERVER_API_URL } from "../../config.js";

import { setNumberFormat } from "../../modules/number_formation_modules/setNumberFormat.js";

import routes from '../../routes.js';
import { useEffect, useState } from "react";

export const VariantCard = ({variant, index, isActive = true}) => {
    const navigate = useNavigate()
    const navigateToTaskSession = (taskType) => {
        variant.pickedTaskType = taskType
        navigate(routes.LESSON_SESSION, {state: variant})
    }

    const [imageExists, setImageExists] = useState(true)
    const imagePath = `${SERVER_API_URL}/${variant.imagePath}`
    const checkImageExist = (imagePath) => {
        return new Promise((resolve, reject) => {
            const img = new Image()
            img.src = imagePath
            img.onload = () => resolve(true)
            img.onerror = () => resolve(false)
        })
    }
    useEffect(() => {
        checkImageExist(imagePath).then(exists => {setImageExists(exists)})
    }, [imagePath])

    return (<>
        <div className="variantCardContainer">
            <div className="variantCardImage">
                {imageExists ? 
                    <img src={imagePath} alt=""/> :
                    <><Loader/><p>Finding Image</p></>
                }
            </div>
            <div className="variantCardOptionsWrapper">
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                        <p><span>{setNumberFormat(index)} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                        {!isActive && <p style={{color:"white"}}>Регистрация или подписка</p>}
                    </div>
                    {isActive && 
                    <div className="variantCardButtons">
                        <div className="variantCardTasksButtons">
                            {Array.from({length:4}, (_, index) => (
                                <Button buttonType={"alt"}
                                        buttonPadding={"0 20px"}
                                        buttonWidth={"100%"}
                                        buttonHeight={""}
                                        buttonIcon={""}
                                        buttonText={index+1}
                                        buttonFunc={()=>{navigateToTaskSession(index+1)}}/>
                            ))}
                        </div>
                        <Button buttonType={"alt"}
                                    buttonPadding={"0 20px"}
                                    buttonWidth={""}
                                    buttonHeight={""}
                                    buttonIcon={""}
                                    buttonText={"Экзамен"}
                                    buttonFunc={()=>{navigate(routes.LESSON_SESSION, {state: variant})}}/>
                    </div>
                    } 
                </div>
            </div>
        </div>
    </>)
}