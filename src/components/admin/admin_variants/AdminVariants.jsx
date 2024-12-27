import "./css/admin_variants_grid.css"
import "./css/admin_variant_card.css"
import "./css/admin_add_variant.css"
import "./css/admin_popup_add_variant.css"
import "./css/admin_popup_name.css"
import "./css/admin_popup_change_task.css"
import "./css/admin_popup_tasks.css"

import { AdminVariantsGrid } from "./AdminVariantsGrid"
import { useEffect, useState } from "react"
import { getAllVariants } from "../../../modules/api/variant/VariantApi"

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