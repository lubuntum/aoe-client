import { useState } from "react"
import { SERVER_API_URL } from "../../../config"
import { deleteVariantData } from "../../../modules/api/variant/VariantApi"
import { ReactComponent as DeleteIcon } from "../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as EditIcon } from "../../../res/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminVariantCard = ({index, variant, downloadVariants}) => {
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
                        <p><span>1</span>{variant.theme}</p>
                    </div>
                    <div className="variantCardBtns">
                        <a className="btn whiteBtn"><ExpandIcon className="whiteBtnSvg"/></a>
                        <a className="btn whiteBtn blockBtn"><EditIcon className="blockBtnSvg"/></a>
                        <a className="btn redBtn" onClick={() => {deleteVariant(variant.id)}}><DeleteIcon className="redBtnSvg"/></a>
                    </div>
                </div>
            </div>
        </div>
    </>)
}