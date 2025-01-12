export const MainUses = ({usesImage, usesText, usesIndex}) => {
    return (<>
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
    </>)
}