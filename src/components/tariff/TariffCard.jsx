import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const TariffCard = ({pos, type, description, price, per, bg}) => {
    return (<>
        <div className="tariffCardContainer" style={{backgroundImage: `url(${bg})`,
                                                     backgroundRepeat: "no-repeat",
                                                     backgroundSize: "cover",
                                                     backgroundPosition: "center"}}>
            <div className="tariffCardWrapper">
                {pos === "left" ? 
                    <div className="tariffCardLeft">
                        <div className="tariffCardNamePosLeft">
                            {type === "base" && <p>Базовая</p>}
                            {type === "standart" && <p>Стандартная</p>}
                        </div>
                        <div className="tariffCardCostPosLeft">
                            {type === "base" && <p>{price}</p>}
                            {type === "standart" && <p>{price}₽<br/><span>/ {per}</span></p>}
                        </div>
                    </div> :
                    
                    <div className="tariffCardRight">
                        <div className="tariffCardNamePosRight">
                            {type === "express" && <p>Экспресс<BoltIcon className="tariffIconSvg"/></p>}
                            {type === "expert" && <p>Эксперт<FaceIcon className="tariffIconSvg"/></p>}
                        </div>
                        <div className="tariffCardCostPosRight">
                            {type === "express" && <p>{price}₽<br/><span>/ {per}</span></p>}
                            {type === "expert" && <p>{price}₽<br/><span>/ {per}</span></p>}
                        </div>
                    </div>}

                <div className="tariffCardDescriptionContainer">
                    {description.map((desc, index) => (
                        <div className="tariffCardDescription">
                            <div className="tariffDescriptionLine"></div>
                            <p>{desc}</p>
                        </div>
                    ))}
                </div>
                
                <div className="tariffCardDivider"></div>
            </div>
            
            {type != "base" ?
                <div className="cardOptions">
                    <div className="defDDContainer">
                        <select className="defDD">
                            <option value={1}>1 токен</option>
                            <option value={6}>6 токенов</option>
                            <option value={12}>12 токенов</option>
                            <option value={24}>24 токена</option>
                            <option value={48}>48 токенов</option>
                        </select>
                    </div>
                    <a className="btn whiteBtn" style={{width: "250px"}}>Купить</a>
                </div> : 

                <div className="cardOptionsEmpty"></div>}
        </div>
    </>)
}
