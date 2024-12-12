import { AdminAddVariant } from "./AdminAddVariant"
import { AdminVariantCard } from "./AdminVariantCard"

export const AdminVariantsGrid = ({setShowPopup}) => {
    return (<>
        <div className="variantsCardGrid">
            <AdminAddVariant setShowPopup={setShowPopup}/>
            <AdminVariantCard/>
            <AdminVariantCard/>
            <AdminVariantCard/>
            <AdminVariantCard/>
            <AdminVariantCard/>
            <AdminVariantCard/>
        </div>
    </>)
}