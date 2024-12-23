import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const TariffTokenCard = ({tariffType, tariffBackground, tariffPrice}) => {
    return (<>
        <div className="tokenCardContainer" style={{backgroundImage: `url(${tariffBackground})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    backgroundRepeat: "no-repeat"}}>
            <div className="tokenCardWrapper">
                <div className="tokenName">
                    {tariffType === "express" ? 
                        <p>Экспресс<BoltIcon className="tokenNameSvg"/></p> :
                        <p>Эксперт<FaceIcon className="tokenNameSvg"/></p>}
                </div>

                <div className="tokenCostWrapper">
                    <div className="tokenCost">
                        {tariffType === "express" ? 
                            <p>{tariffPrice}₽<br/><span>/ 1 токен</span></p> :
                            <p>{tariffPrice}₽<br/><span>/ 12 токенов</span></p>}
                    </div>
                </div>

                <div className="tokenDescriptionConatiner">
                    <div className="tokenDescription">
                        <p>Срок действия токенов 270 дней</p>
                    </div>
                    <div className="tokenDescription">
                        <p>Больше токенов - Меньше цена</p>
                    </div>
                    <div className="tokenDescription">
                        <p>Проверка осуществляется индийскими экстрасенсами под героином</p>
                    </div>
                </div>
            </div>

            <div className="tokenOptions">
                {tariffType === "express" ? 
                    <div className="defDDContainer" style={{width: "200px"}}>
                        <select className="defDD">
                            <option value={1}>1 токен</option>
                            <option value={6}>6 токенов</option>
                            <option value={12}>12 токенов</option>
                            <option value={24}>24 токена</option>
                            <option value={48}>48 токенов</option>
                        </select>
                    </div> : 
                    <div className="defDDContainer" style={{width: "200px"}}>
                        <select className="defDD">
                            <option value={12}>12 токенов</option>
                            <option value={24}>24 токена</option>
                            <option value={36}>36 токенов</option>
                            <option value={48}>48 токенов</option>
                            <option value={60}>60 токенов</option>
                        </select>
                    </div>}
                <a className="btn whiteBtn" style={{width: "200px"}}>Купить</a>
            </div>
        </div>
    </>)
}