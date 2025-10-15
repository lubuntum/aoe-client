import { BtnLink } from "../tme_reusable/BtnLink"

import { useEffect, useState } from "react"
import { Loader } from "../tme_reusable/Loader"

import { ReactComponent as LockI } from "../../res/icons/lock_24dp_gi.svg"
import { ReactComponent as BrokenI } from "../../res/icons/broken_image_24dp_gi.svg"

export const VariantsCard = ({isLocked = false, imgUrl, isPreloaded}) => {
    const [imageLoaded, setImageLoaded] = useState(isPreloaded)

    useEffect(() => {
        if (isPreloaded) {
            setImageLoaded(true)
        }
    }, [isPreloaded])

    const handleImageLoad = () => {
        setImageLoaded(true)
    }

    return (<>
        <div className={`variant_card_container ${isLocked ? "variant_card_locked" : ""}`}>
            <div className="variant_card_content">
                <div className="variant_card_image">
                    {imgUrl && <img src={imgUrl} alt="variant_image" onLoad={handleImageLoad} loading="lazy" className={`${isLocked ? "image_locked" : ""}`}/>}
                    {!imgUrl && <BrokenI className="svg_icon"/>}
                </div>

                <div className="variant_card_info">
                    <p>Healthy cats</p>

                    {!isLocked &&
                    <div className="variant_card_options">
                        <BtnLink btnText={"1"}/>
                        <BtnLink btnText={"2"}/>
                        <BtnLink btnText={"3"}/>
                        <BtnLink btnText={"4"}/>
                        <BtnLink btnText={"Экзамен"}/>
                    </div>}

                    {isLocked && <LockI className="svg_icon"/>}
                </div> 
            </div>
        </div>
    </>)
}