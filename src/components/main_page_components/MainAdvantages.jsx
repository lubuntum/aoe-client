export const MainAdvantages = ({advantageImage, advantageText}) => {
    return (<>
        <div className="advantageCard">
            <div className="advantageCardImage">
                {advantageImage}
            </div>
            <div className="advantageCardText">
                {advantageText}
            </div>
        </div>
    </>)
}