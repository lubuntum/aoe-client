import "../css/admin_variants_grid.css"
import "../css/admin_variant_popup.css"
import "../css/admin_variant_popup_tasks.css"
import "../css/admin_variant_popup_options.css"
import "../css/admin_variant_popup_name.css"
import "../css/admin_variant_add_card.css"

import { AdminVariantsGrid } from "./AdminVariantsGrid"
import { useEffect, useState } from "react"
import { getAllVariants } from "../../../modules/api_modules/variantAPI"

export const AdminVariants = ({setShowPopup}) => {
    const [variants, setVariants] = useState(null)
    useEffect(() => {
        downloadVariants()
    }, [])
    const downloadVariants = async () => {
        const response = await getAllVariants(localStorage.getItem("token"))
        console.log(response.data)
        setVariants(response.data)
    }
    return (<>
        <AdminVariantsGrid setShowPopup={setShowPopup} variants={variants} setVariants = {setVariants} downloadVariants = {downloadVariants}/>
    </>)
}