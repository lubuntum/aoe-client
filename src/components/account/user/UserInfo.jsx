import { ReactComponent as FaceIcon } from "../../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
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
                <div className="tokenTitle"><FaceIcon className="tokenSvg"/><p>Количество Токенов</p></div>
                <div className="remainToken">{remainTokens}</div>
                <a className="defBtn altBtn" style={{width: "100%"}} onClick={() => {}}>Пополнить</a>
            </div>

            <div className="userInfoTokenMini">
                <a className="defBtn" style={{width: "100px"}}><FaceIcon className="defBtnSvg"/><span>{remainTokens}</span><AddIcon className="defBtnSvg"/></a>
            </div>
        </div>
    </>)
}