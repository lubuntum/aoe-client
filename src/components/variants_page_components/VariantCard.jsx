import { useNavigate } from "react-router-dom"

import { ReactComponent as LockIcon } from "../../res/icons/lock_24dp_gi.svg"

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
                    <><Loader/><p>Finding Image...</p></>
                }
            </div>
            <div className="variantCardOptionsWrapper">
                {isActive ?
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                        <p><span>{setNumberFormat(index)} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                        {!isActive && <p style={{color:"white"}}>Регистрация или подписка</p>}
                    </div>
                    {isActive && 
                    <div className="variantCardButtons">
                        <div className="variantCardTasksButtons">
                            {Array.from({length:4}, (_, index) => (
                                <Button key={"variantTaskButton0"}
                                        buttonType={"alt"}
                                        buttonPadding={"0 20px"}
                                        buttonWidth={"100%"}
                                        buttonText={index+1}
                                        buttonFunc={()=>{navigateToTaskSession(index+1)}}/>
                            ))}
                        </div>
                        <Button key={"variantExamButton0"}
                                buttonType={"alt"}
                                buttonPadding={"0 20px"}
                                buttonText={"Экзамен"}
                                buttonFunc={()=>{navigate(routes.LESSON_SESSION, {state: variant})}}/>
                    </div>
                    } 
                </div> :
                <div className="variantCardBlock">
                    <p>Доступен после регистрации или оформления подписки</p>
                    <LockIcon className="svgIcon"/>
                    <p><span>{setNumberFormat(index)} </span>{variant.theme ? variant.theme : "Тема не найдена"}</p>
                </div>}
            </div>
        </div>
    </>)
}