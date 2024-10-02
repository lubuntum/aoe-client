import { ReactComponent as BoltIcon } from "../../res/icons/bolt_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as FaceIcon } from "../../res/icons/face_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"
import { ReactComponent as AddIcon } from "../../res/icons/add_24dp_E8EAED_FILL0_wght400_GRAD0_opsz24.svg"

export const UserData = () => {
    return (<>
        <div className="userContainerWrapper gridItem1">
            <div className="userDataColumn">
                <div className="userDataContainer">
                    <p>Почта</p>
                    <p>timofeyershovv@gmail.com</p>
                </div>
                <div className="userDataContainer">
                    <p>Имя пользователя</p>
                    <p>timofeyershovv</p>
                </div>
            </div>

            <div className="userDataColumn">
                <div className="userDataContainer">
                    <p>Имя</p>
                    <p>Тимофей</p>
                </div>
                <div className="userDataContainer">
                    <p>Фамилия</p>
                    <p>Ершов</p>
                </div>
            </div>

            <div className="userDataColumn">
                <div className="userDataContainer">
                    <p>Дата регистрации</p>
                    <p>20.12.2024</p>
                </div>
                <div className="userDataContainer">
                    <p>Партнерская программа</p>
                    <p>Неактивна</p>
                </div>
            </div>
            
            <div className="tokensWrapper">
                <div className="tokenContainer">
                    <div className="tokenTitle">
                        <BoltIcon className="tokenSvg"/>
                        <p>Экспресс проверки</p>
                    </div>
                    <div className="tokenRemain">00</div>
                    <a className="btn" style={{width: "100%"}} onClick={() => {}}>Пополнить</a>
                </div>

                <div className="tokenContainer">
                    <div className="tokenTitle">
                        <FaceIcon className="tokenSvg"/>
                        <p>Проверки Экспертом</p>
                    </div>
                    <div className="tokenRemain">00</div>
                    <a className="btn" style={{width: "100%"}} onClick={() => {}}>Пополнить</a>
                </div>
            </div>

            <div className="tokensMini" style={{display: "none"}}>
                <a className="btn"><BoltIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
                <a className="btn"><FaceIcon className="svgIcon"/> <span>00</span> <AddIcon className="svgIcon"/></a>
            </div>
        </div>
    </>)
}