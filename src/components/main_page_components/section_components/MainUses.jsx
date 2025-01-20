import React from "react"

export const MainUses = React.memo(({usesImage, usesText, usesIndex}) => {
    return (
        <div className="usesCard">
            <div className="usesCardImage">
                {usesImage}
            </div>
            <div className="usesCardText">
                {usesText}
            </div>
            <div className="usesCardIterator">
                {usesIndex}
            </div>
        </div>
    )
})