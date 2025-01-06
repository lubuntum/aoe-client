import { Loader } from "../../../reusible_components/Loader"

export const ResultsSidebarLoading = ({className}) => {
    return (<>
        <div className={`resultsSidebarContainerLoading ${className}`}>
            <Loader/>
        </div>
    </>)
}