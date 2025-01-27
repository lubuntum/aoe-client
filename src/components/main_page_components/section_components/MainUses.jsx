import React from "react"

export const MainUses = React.memo(({iterator, usesImage, usesText}) => {
    return (
        <div className="usesCard">
            <div className="usesCardIterator">
                <p>{iterator}</p>
            </div>
            <div className="usesCardImage">
                {usesImage}
            </div>
            <div className="usesCardText">
                <p>{usesText}</p>
            </div>
        </div>
    )
})