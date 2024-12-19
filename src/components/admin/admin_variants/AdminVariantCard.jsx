import { SERVER_API_URL } from "../../../config"
import { ReactComponent as DeleteIcon } from "../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as EditIcon } from "../../../res/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminVariantCard = ({index, variant}) => {
    return (<>
        <div className="variantCardContainer">
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
                        <a className="btn redBtn"><DeleteIcon className="redBtnSvg"/></a>
                    </div>
                </div>
            </div>
        </div>
    </>)
}