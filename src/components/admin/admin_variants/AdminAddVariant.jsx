import { ReactComponent as AddIcon } from "../../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const AdminAddVariant = ({setShowPopup}) => {
    return (<>
        <a className="addVariantBtn" onClick={() => setShowPopup(true)}><AddIcon className="addVariantSvgIcon"/></a>
    </>)
}