import { ReactComponent as AddIcon } from "../../../res/icons/add_24dp_gi.svg"

export const AdminVariantAddCard = ({setShowPopup}) => {
    return (<>
        <a className="addVariantBtn" onClick={() => setShowPopup(true)}><AddIcon className="addVariantSvgIcon"/></a>
    </>)
}