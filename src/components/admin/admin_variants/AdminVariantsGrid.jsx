import { AdminAddVariant } from "./AdminAddVariant"
import { AdminVariantCard } from "./AdminVariantCard"

export const AdminVariantsGrid = ({setShowPopup, variants, downloadVariants}) => {
    return (<>
        <div className="variantsCardGrid">
            <AdminAddVariant setShowPopup={setShowPopup}/>
            {variants && variants.map((variant, index) => (
                <AdminVariantCard index={index} variant={variant} downloadVariants = {downloadVariants}/>
            ))}
        </div>
    </>)
}