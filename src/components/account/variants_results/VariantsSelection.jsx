import "./css/variants_selection.css"

import { VariantSelectionBtn } from "./VariantSelectionBtn"

export const VariantsSelection = ({variants, showTasksClick}) => {
    return (<>
        <div className="variantsContainerWrapper gridItem6">
            {variants.map( (v, i) => (
                <VariantSelectionBtn type={"variant"} id={v.id} theme={v.theme} showTasksClick={showTasksClick} index = {i}/>
            ))}
        </div>
    </>)
}   