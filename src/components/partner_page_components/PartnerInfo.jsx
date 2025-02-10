import { useEffect } from "react"

export const PartnerInfo = ({className, partner}) => {

    return (
        <div className={`partnerInfoContainer ${className}`}>
            {partner && 
                <div className="partnerInfoBioContainer">
                    <div className="partnerInfoBioContainerItem">
                        <p>Имя</p>
                        <p>{partner.partnerName ? partner.partnerName : "Нет данных"}</p>
                    </div>

                    <div className="partnerInfoBioContainerItem">
                        <p>Почта</p>
                        <p>{partner.email ? partner.email : "Нет данных"}</p>
                    </div>

                    <div className="partnerInfoBioContainerItem">
                        <p>Фамилия</p>
                        <p>{partner.secondName ? partner.secondName : "Нет данных"}</p>
                    </div>

                    <div className="partnerInfoBioContainerItem">
                        <p>Дата регистрации</p>
                        <p>{partner.registrationDate}</p>
                    </div>

                    <div className="partnerInfoBioContainerItem">
                        <p>Отчество</p>
                        <p>{partner.patronynic ? partner.patronymic : "Нет данных"}</p>
                    </div>

                    <div className="partnerInfoBioContainerItem">
                        <p>Активных пользователей</p>
                        <p>{partner.promocodeUsageCount ? partner.promocodeUsageCount : "Нет данных"}</p>
                    </div>
                </div>
            }
        </div>
    )
}