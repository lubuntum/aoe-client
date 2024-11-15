import "../../../../App.css"
import "./css/sidebar.css"
import "./css/sidebar_media.css"

import { VariantSelectionBtn } from "./VariantSelectionBtn"

export const VariantsSelection = ({variants, showTasksClick}) => {
    return (<>
        <div className="resultVariantSelectionContainer gridItem6">
            {variants && variants.map( (v, i) => (
                <VariantSelectionBtn type={"variant"} id={v.id} theme={v.theme} showTasksClick={showTasksClick} index = {i}/>
            ))}
        </div>
    </>)
}   