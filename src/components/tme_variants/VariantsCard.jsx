import { BtnLink } from "../tme_reusable/BtnLink"

import { ReactComponent as LockI } from "../../res/icons/lock_24dp_gi.svg"

export const VariantsCard = ({isLocked = false}) => {
    return (<>
        
        <div className={`variant_card_container ${isLocked ? "variant_card_locked" : ""}`}>
            <div className="variant_card_content">
                <div className="variant_card_image">
                    <img src="https://marketplace.canva.com/8-1Kc/MAGoQJ8-1Kc/1/tl/canva-ginger-cat-with-paws-raised-in-air-MAGoQJ8-1Kc.jpg" alt="variant_image" loading="lazy" className={`${isLocked ? "image_locked" : ""}`}/>
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