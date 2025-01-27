import React from "react"

export const MainAdvantages = React.memo(({iterator, advantageImage, advantageName, advantageDescription}) => {
    return (
        <div className="advantageCard">
            <div className="advantageCardIterator">
                <p>{iterator}</p>
            </div>
            <div className="advantageCardImage">
                {advantageImage}
            </div>
            <div className="advantageCardName">
                <p>{advantageName}</p>
            </div>
            <div className="advantageCardDescription">
                <p>{advantageDescription}</p>
            </div>
        </div>
    )
})