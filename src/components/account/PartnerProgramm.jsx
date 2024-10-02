import { ReactComponent as CheckIcon } from "../../res/icons/check_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const PartnerProgramm = () => {
    return (<>
    <div className="partnerProgrammCardWrapper">
        <div className="cardTitle">
            <p className="partnerProgrammCardTitle">Партнерская программа</p>
            <div className="horizontalDivider"></div>
        </div>
        <div className="partnerProgrammCardInfo">
            <div className="partnerProgrammInputWrapper">
                <div className="inputContainer">
                    <input className="customInput" type="text" placeholder="Введите промокод" required></input>
                    <div className="passwordStrength" style={{display: "none"}}></div>
                </div>
                <div className="partnerProgrammCheck">
                    <a className="btn" onClick={() => {}}><CheckIcon className="svgIcon"/></a>
                </div>
            </div>
        </div>
    </div>
    </>)
}