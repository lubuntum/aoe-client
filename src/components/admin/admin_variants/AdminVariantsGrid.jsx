import { AdminAddVariant } from "./AdminAddVariant"
import { AdminVariantCard } from "./AdminVariantCard"

export const AdminVariantsGrid = ({setShowPopup, variants, setVariants, downloadVariants}) => {
    return (<>
        <div className="variantsCardGrid">
            <AdminAddVariant setShowPopup={setShowPopup}/>
            {variants && variants.map((variant, index) => (
                <div key={variant.id}>
                    <AdminVariantCard index={index} variant={variant} setVariants = {setVariants} downloadVariants = {downloadVariants}/>
                </div>
            ))}
        </div>
    </>)
}