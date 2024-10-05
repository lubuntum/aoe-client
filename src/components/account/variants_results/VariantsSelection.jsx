import { ReactComponent as MenuIcon } from "../../../res/icons/keyboard_arrow_down_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import "./css/variants_selection.css"

import { VariantSelectionBtn } from "./VariantSelectionBtn"

export const VariantsSelection = ({variants, showTasksClick}) => {
    return (<>
        <div className="selectVariantsContainer gridItem6">
            <p className="title" style={{display: "none"}}>Варианты</p>
            <div className="variantsContainerWrapper gridItem6">
                {variants.map( (v, i) => (
                    <VariantSelectionBtn type={"variant"} id={v.id} theme={v.theme} showTasksClick={showTasksClick} index = {i}/>
                ))}
            </div>
        </div>
    </>)
}   