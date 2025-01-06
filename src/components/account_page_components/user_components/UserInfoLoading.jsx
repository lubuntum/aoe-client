import { Loader } from "../../reusible_components/Loader"

export const UserInfoLoading = ({className}) => {
    return (<>
        <div className={`userInfoContainerLoading ${className}`}>
            <Loader/>
        </div>
    </>)
}