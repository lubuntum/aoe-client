import "./css/admin_variants_grid.css"
import "./css/admin_variant_card.css"
import "./css/admin_add_variant.css"
import "./css/admin_popup_add_variant.css"
import "./css/admin_popup_name.css"
import "./css/admin_popup_change_task.css"
import "./css/admin_popup_tasks.css"

import { AdminVariantsGrid } from "./AdminVariantsGrid"

export const AdminVariants = ({setShowPopup}) => {
    return (<>
        <AdminVariantsGrid setShowPopup={setShowPopup}/>
    </>)
}