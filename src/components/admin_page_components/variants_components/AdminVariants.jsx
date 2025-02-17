import "../css/admin_variants_grid.css"
import "../css/admin_variant_popup.css"
import "../css/admin_variant_popup_tasks.css"
import "../css/admin_variant_popup_options.css"
import "../css/admin_variant_popup_name.css"
import "../css/admin_variant_add_card.css"

import { AdminVariantsGrid } from "./AdminVariantsGrid"
import { useEffect, useState } from "react"
import { getAllVariants } from "../../../modules/api_modules/variantAPI"
import { sortVariants } from "../../../modules/date_modules/sortingDate"

export const AdminVariants = ({setShowPopup, showPopup}) => {
    const [variants, setVariants] = useState(null)
    useEffect(() => {
        downloadVariants()
    }, [showPopup])
    const downloadVariants = async () => {
        const response = await getAllVariants(localStorage.getItem("token"))
        console.log(response.data)
        response.data.sort(sortVariants)
        setVariants(response.data)
    }
    return (<>
        <AdminVariantsGrid setShowPopup={setShowPopup} variants={variants} setVariants = {setVariants} downloadVariants = {downloadVariants}/>
    </>)
}