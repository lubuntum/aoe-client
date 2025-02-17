import { PageTitle } from "../reusible_components/PageTitle"
import { VariantCard } from "./VariantCard"

import { Button } from "../reusible_components/Button"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { AUTH_VARIANTS_AVAILABLE, VISITORS_VARIANTS_AVAILABLE } from "../../config"

export const VariantsContent = ({variants, setCurrentPage, isSub}) => {
    console.log(variants)
    const {isAuth} = useAuth()
    const displayVariants = (size) => {
        return (
            variants.content ? <>
                <div className='variantsGrid'>
                    {variants.content.map((variant, i)=>(
                        <VariantCard variant={variant} isActive={(i < size)} index={i+1 + (variants.pageable.pageSize * variants.pageable.pageNumber)}/>
                    ))}
                </div> 
            </> : 
            <p>Ошибка загрузки вариантов, обновите страницу</p>
        )
    }

    const displayAvailableVariants = () => {
        if (isSub) return displayVariants(variants.pageable.pageSize)
        if (isAuth && variants.pageable.pageNumber === 0) return displayVariants(AUTH_VARIANTS_AVAILABLE)
        if(variants.pageable.pageNumber > 0) return displayVariants(0)
        return displayVariants(VISITORS_VARIANTS_AVAILABLE)
    }
    
    return (<>
        <div className='variantsContentWrapper'>
            <PageTitle pageTitleText={"Выберите #вариант# для прохождения"}/>
            {displayAvailableVariants()}
            <div className="resultsRecordsTablePagination">
                {Array.from({length: variants.totalPages}, (_, index)=>(
                    <Button key={index + 1}
                            buttonType={`ghost ${index === variants.pageable.pageNumber && "paginationActive"}`}
                            buttonText={index + 1}
                            buttonFunc={()=>{setCurrentPage(index)}}/>
                ))}
            </div>
        </div>
    </>)
}