import { useState } from "react"
import { SERVER_API_URL } from "../../../config"
import { deleteVariantData, updateVariantVisibility } from "../../../modules/api_modules/variantAPI"

import { setNumberFormat } from "../../../modules/number_formation_modules/setNumberFormat"

import { Button } from "../../reusible_components/Button" 

import { ReactComponent as VisibilityOffIcon } from "../../../res/icons/visibility_off_24dp_gi.svg"
import { ReactComponent as VisibilityOnIcon } from "../../../res/icons/visibility_24dp_gi.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_gi.svg"

export const AdminVariantCard = ({index, variant, setVariants, downloadVariants}) => {
    const [status, setStatus] = useState(null)
    const deleteVariant = async (variantId) => {
        try{
            const response = await deleteVariantData(variantId)
            if (response.status !== 200) setStatus(response.status)
        }
        catch(e) {
            setStatus(e)
        }
        downloadVariants()
        //TODO if success or error let user know from response status
    }
    const changeVariantVisibility = async (variantId, visibility) => {
        const response = await updateVariantVisibility(variantId, visibility, localStorage.getItem("token"));
        const updatedVariant = response.data
        console.log(response.data)
        //setStatus(response.data);//can be 200 or others, response.data => message for admin
        setVariants((prevVariants) => 
            prevVariants.map((variant) => 
                variant.id === updatedVariant.id ? updatedVariant : variant
            )
        )
    }
    return (<>
        <div className="variantCardContainer">
            {status && 
            <div style={{"width" : "100%", "height" : "100px", "opacity" : "0.6", "background-color": "red", "position": "absolute"}}>
                <p style={{"height":"100%", "display":"flex", "justifyContent":"center", "alignItems":"center"}}>{status}</p>
            </div>}
            
            <div className="variantCardImg">
                <img src={`${SERVER_API_URL}/${variant.imagePath}`} alt=""></img>
            </div>

            <div className="variantCardWrapper">
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                        <p><span>{setNumberFormat(index + 1)}</span> {variant.theme}</p>
                    </div>
                    <div className="variantCardBtns">
                        <Button buttonType={"alt"}
                                buttonWidth={"100%"}
                                buttonIcon={<ExpandIcon className="svgIcon"/>}
                                buttonText={"Детально"}/>

                        {variant.isVisible ?
                            <Button buttonType={"bad"}
                                    buttonWidth={"100%"}
                                    buttonIcon={<VisibilityOffIcon className="svgIcon"/>}
                                    buttonText={"Скрыть"}
                                    buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/> :
                            <Button buttonType={"good"}
                                    buttonWidth={"100%"}
                                    buttonIcon={<VisibilityOnIcon className="svgIcon"/>}
                                    buttonText={"Показать"}
                                    buttonFunc={()=>{changeVariantVisibility(variant.id, !variant.isVisible)}}/>}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
