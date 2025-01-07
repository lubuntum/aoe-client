import { PageTitle } from "../reusible_components/PageTitle"
import { VariantCard } from "./VariantCard"

import { Button } from "../reusible_components/Button"

export const VariantsContent = ({variants}) => {
    return (<>
        <div className='variantsContentWrapper'>
            <PageTitle pageTitleText={"Выберите вариант для прохождения"}/>
            
            {variants ? <>
                <div className='variantsGrid'>
                    {variants.map((variant, i)=>(
                        <VariantCard variant={variant} index={i+1}/>
                    ))}
                </div> 
            </> : 
            <p>Ошибка загрузки вариантов, обновите страницу</p>}

            <Button buttonType={""}
                    buttonPadding={"0 20px"}
                    buttonWidth={""}
                    buttonHeight={""}
                    buttonIcon={""}
                    buttonText={"Показать еще"}
                    buttonFunc={()=>{}}/>
        </div>
    </>)
}