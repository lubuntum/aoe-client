import { ReactComponent as AddIcon } from "../../../res/icons/add_24dp_gi.svg"
import routes from "../../../routes"

export const AdminVariantAddCard = ({setShowPopup}) => {
    return (<>
        <a className="addVariantBtn" 
           onClick={()=>{window.open(routes.ADD_VARIANT, "_blank")}}><AddIcon className="addVariantSvgIcon"/></a>
    </>)
}