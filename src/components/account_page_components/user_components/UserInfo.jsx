import { UserRemainingBalance } from "./UserRemainingBalance"

export const UserInfo = ({customer, className}) => {
    return (<>
        <div className={`userInfoContainer ${className}`}>
            <div className="userInfoBioContainer">
                <div className="userInfoBioContainerItem">
                    <p>Почта</p>
                    <p>{customer.email ? customer.email : "Не указано"}</p>
                </div>

                <div className="userInfoBioContainerItem">
                    <p>Имя</p>
                    <p>{customer.name ? customer.name : "Не указано"}</p>
                </div>

                <div className="userInfoBioContainerItem">
                    <p>Партнерская программа</p>
                    <p>{customer.partnerName ? customer.partnerName : "Неактивна"}</p>
                </div>

                <div className="userInfoBioContainerItem">
                    <p>Дата регистрации</p>
                    <p>{customer.registrationDate ? customer.registrationDate : "Не указано"}</p>
                </div>

                <div className="userInfoBioContainerItem">
                    <p>Фамилия</p>
                    <p>{customer.secondName ? customer.secondName : "Не указано"}</p>
                </div>
            </div>

            <UserRemainingBalance customer={customer}/>
        </div>
    </>)
}