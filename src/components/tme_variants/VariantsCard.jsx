import { BtnLink } from "../tme_reusable/BtnLink"

import { useEffect, useState } from "react"
import { Loader } from "../tme_reusable/Loader"

import { ReactComponent as LockI } from "../../res/icons/lock_24dp_gi.svg"
import { ReactComponent as BrokenI } from "../../res/icons/broken_image_24dp_gi.svg"
import { SERVER_API_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import routes from "../../routes"

export const VariantsCard = ({ card, imgUrl, isPreloaded }) => {
    const [imageLoaded, setImageLoaded] = useState(isPreloaded)
    const navigate = useNavigate()
    const navigateToTaskSession = (taskType) => {
            card.pickedTaskType = taskType
            navigate(routes.LESSON_SESSION, {state: card})
        }
    useEffect(() => {
        if (isPreloaded) {
            setImageLoaded(true)
        }
    }, [isPreloaded])

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    return (<>
        <div className={`variant_card_container ${card.isLocked ? "variant_card_locked" : ""}`}>
            <div className="variant_card_content">
                <div className="variant_card_image">
                    {imgUrl && <img src={`${SERVER_API_URL}/${imgUrl}`} alt="variant_image" onLoad={handleImageLoad} loading="lazy" className={`${card.isLocked ? "image_locked" : ""}`}/>}
                    {!imgUrl && <BrokenI className="svg_icon"/>}
                </div>

                <div className="variant_card_info">
                    <p>{card.theme || "Без темы"}</p>

                    {!card.isLocked &&
                    <div className="variant_card_options">
                        <BtnLink btnText={"1"} btnFunc={() => navigateToTaskSession(1)}/>
                        <BtnLink btnText={"2"} btnFunc={() => navigateToTaskSession(2)}/>
                        <BtnLink btnText={"3"} btnFunc={() => navigateToTaskSession(3)}/>
                        <BtnLink btnText={"4"} btnFunc={() => navigateToTaskSession(4)}/>
                        <BtnLink btnText={"Экзамен"} btnFunc={() => navigate(routes.LESSON_SESSION, {state: card})}/>
                    </div>}

                    {card.isLocked && <LockI className="svg_icon"/>}
                </div> 
            </div>
        </div>
    </>)
}