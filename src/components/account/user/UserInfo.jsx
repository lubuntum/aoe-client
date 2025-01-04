import { ReactComponent as FaceIcon } from "../../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as RubIcon } from "../../../res/icons/currency_ruble_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

import { setDigitsFormat } from "./../../../modules/digitsFormat/setDigitsFormat"

export const UserInfo = ({customer}) => {
    let remainTokens = setDigitsFormat(customer.attemptsExpert)
  
    return (<>
        <div className="userInfoContainer gridItem1">
            <div className="userInfoBioContainer">
                <div className="bioContainerItem">
                    <p>Почта</p>
                    <p>{customer.email}</p>
                </div>

                <div className="bioContainerItem">
                    <p>Имя</p>
                    <p>{customer.name ? customer.name : "Не указано"}</p>
                </div>

                <div className="bioContainerItem">
                    <p>Партнерская программа</p>
                    <p>{customer.partnerName ? customer.partnerName : "Неактивна"}</p>
                </div>

                <div className="bioContainerItem">
                    <p>Дата регистрации</p>
                    <p>{customer.registrationDate}</p>
                </div>

                <div className="bioContainerItem">
                    <p>Фамилия</p>
                    <p>{customer.secondName ? customer.secondName : "Не указано"}</p>
                </div>
            </div>
            
            <div className="userInfoToken">
                <div className="tokenTitle"><p>Баланс</p></div>
                <div className="remainToken">₽ {remainTokens}</div>
                <a className="btn whiteBtn" style={{width: "100%"}} onClick={() => {}}>Пополнить</a>
            </div>

            <div className="userInfoTokenMini">
                <a className="btn defaultBtn" style={{width: "100px"}}><FaceIcon className="defaultBtnSvg"/><span>{remainTokens}</span><AddIcon className="defaultBtnSvg"/></a>
            </div>
        </div>
    </>)
}