import { ReactComponent as DeleteIcon } from "../../../res/icons/delete_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as EditIcon } from "../../../res/icons/edit_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as ExpandIcon } from "../../../res/icons/quick_reference_all_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminVariantCard = () => {
    return (<>
        <div className="variantCardContainer">
            <div className="variantCardImg">
                <img src="https://img.freepik.com/free-photo/view-lynx-animals-wild_23-2150374914.jpg?t=st=1729166295~exp=1729169895~hmac=5b1c1876ac35fb8db6f1f9f053910b1d914a680510e7e4e0801c2fd1e4e23559&w=1380" alt=""></img>
            </div>

            <div className="variantCardWrapper">
                <div className="variantCardContent">
                    <div className="variantCardTitle">
                        <p><span>1</span> Theme</p>
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