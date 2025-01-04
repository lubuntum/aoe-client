import { useState } from "react"
import { SERVER_API_URL } from "../../../config"
import { deleteVariantData, updateVariantVisibility } from "../../../modules/api/variant/VariantApi"
import { ReactComponent as VisibilityOffIcon } from "../../../res/icons/visibility_off_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as VisibilityOnIcon } from "../../../res/icons/visibility_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { setDigitsFormat } from "../../../modules/digitsFormat/setDigitsFormat.js"

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
                        <p><span>{setDigitsFormat(index + 1)}</span> {variant.theme}</p>
                    </div>
                    <div className="variantCardBtns">
                        <a className="btn whiteBtn" style={{width: "180px"}}><ExpandIcon className="whiteBtnSvg"/><span>Детально</span></a>
                        {variant.isVisible ? 
                            <a className="btn redBtn" style={{width: "150px"}} onClick={() => {changeVariantVisibility(variant.id, !variant.isVisible)}}>
                                <VisibilityOffIcon className="redBtnSvg"/>
                                <span>Скрыть</span>
                            </a> :
                            <a className="btn greenBtn" style={{width: "150px"}} onClick={() => {changeVariantVisibility(variant.id, !variant.isVisible)}}>
                                <VisibilityOnIcon className="greenBtnSvg"/>
                                <span>Показать</span>
                            </a>}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
