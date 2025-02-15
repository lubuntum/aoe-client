import { PageTitle } from "../reusible_components/PageTitle"
import { VariantCard } from "./VariantCard"

import { Button } from "../reusible_components/Button"
import { useAuth } from "../../modules/auth_modules/AuthProvider"
import { AUTH_VARIANTS_AVAILABLE, VISITORS_VARIANTS_AVAILABLE } from "../../config"

export const VariantsContent = ({variants, setCurrentPage, isSub}) => {
    const {isAuth} = useAuth()
    const displayVariants = (size) => {
        console.log(size)
        return (
            variants.content ? <>
                <div className='variantsGrid'>
                    {variants.content.map((variant, i)=>(
                        <VariantCard variant={variant} isActive={(i < size)} index={i+1}/>
                    ))}
                </div> 
            </> : 
            <p>Ошибка загрузки вариантов, обновите страницу</p>
        )
    }
    
    return (<>
        <div className='variantsContentWrapper'>
            <PageTitle pageTitleText={"Выберите #вариант# для прохождения"}/>
            {isSub ? displayVariants(variants.pageable.pageSize) : isAuth ? displayVariants(AUTH_VARIANTS_AVAILABLE) : displayVariants(VISITORS_VARIANTS_AVAILABLE)}
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