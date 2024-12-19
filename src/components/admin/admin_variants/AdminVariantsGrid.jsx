import { AdminAddVariant } from "./AdminAddVariant"
import { AdminVariantCard } from "./AdminVariantCard"

export const AdminVariantsGrid = ({setShowPopup, variants}) => {
    return (<>
        <div className="variantsCardGrid">
            <AdminAddVariant setShowPopup={setShowPopup}/>
            {variants.map((variant, index) => (
                <AdminVariantCard index={index} variant={variant}/>
            ))}
        </div>
    </>)
}