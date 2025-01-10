import "./css/tooltip.css"

import { ReactComponent as HelpIcon } from "../../res/icons/help_24dp_gi.svg"

export const Tooltip = ({tooltipText}) => {
    return (<>
        <div className="tooltipContainer">
            <div className="tooltipIcon">
                <HelpIcon/>
            </div>
            <div className="tooltipText">
                <p>{tooltipText}</p>
            </div>
        </div>
    </>)
}