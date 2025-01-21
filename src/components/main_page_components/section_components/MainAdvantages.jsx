import React from "react"

export const MainAdvantages = React.memo(({advantageImage, advantageName, advantageDescription}) => {
    return (
        <div className="advantageCard">
            <div className="advantageCardImage">
                {advantageImage}
            </div>
            <div className="advantageCardName">
                {advantageName}
            </div>
            <div className="advantageCardDesc">
                {advantageDescription}
            </div>
        </div>
    )
})