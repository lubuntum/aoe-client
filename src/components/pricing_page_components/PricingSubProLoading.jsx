import { Loader } from "../reusible_components/Loader"

export const PricingSubProLoading = ({className}) => {
    return (
        <div className={`pricingSubProContainer ${className}`}>
            <div className="pricingSubProWrapper">
                <Loader/>
            </div>
        </div>
    )
}