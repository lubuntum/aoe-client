import "./css/variants_selection.css"

import { SelectionButtons } from "./SelectionButtons"

export const VariantsSelection = ({variants}) => {
    return (<>
        <div className="variantsContainerWrapper gridItem6">
            {variants.map( (v) => (
                <SelectionButtons type={"variant"} id={v.id} theme={v.theme}/>
            ))}
        </div>
    </>)
}   