import { PageTitle } from "../reusible_components/PageTitle"
import { VariantCard } from "./VariantCard"

import { Button } from "../reusible_components/Button"

export const VariantsContent = ({variants}) => {
    return (<>
        <div className='tasksContentWrapper'>
            <PageTitle pageTitleText={"Выберите вариант для прохождения"}/>
            
            {variants ? <>
                <div className='tasksCardsGrid'>
                    {variants.map((variant, i)=>(
                        <VariantCard variant={variant} index={i+1}/>
                    ))}
                </div> 
            </> : 
            <p>Ошибка загрузки вариантов, обновите страницу</p>}

            <Button buttonPadding={"0 1.25rem"}
                    buttonText={"Показать еще"}/>
        </div>
    </>)
}