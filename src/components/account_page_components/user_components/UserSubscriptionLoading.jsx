import { Loader } from "../../reusible_components/Loader"

export const UserSubscriptionLoading = ({className}) => {
    return (<>
        <div className={`userSubscriptionContainerLoading ${className}`}>
            <Loader/>
        </div>
    </>)
}