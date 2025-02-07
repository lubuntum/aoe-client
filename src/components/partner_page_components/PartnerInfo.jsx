export const PartnerInfo = ({className}) => {
    return (
        <div className={`partnerInfoContainer ${className}`}>
            <div className="partnerInfoBioContainer">
                <div className="partnerInfoBioContainerItem">
                    <p>Имя</p>
                    <p>Тимофей</p>
                </div>

                <div className="partnerInfoBioContainerItem">
                    <p>Почта</p>
                    <p>timofeyershovv@gmail.com</p>
                </div>

                <div className="partnerInfoBioContainerItem">
                    <p>Фамилия</p>
                    <p>Ершов</p>
                </div>

                <div className="partnerInfoBioContainerItem">
                    <p>Дата регистрации</p>
                    <p>24.06.2024</p>
                </div>

                <div className="partnerInfoBioContainerItem">
                    <p>Отчество</p>
                    <p>Андреевич</p>
                </div>

                <div className="partnerInfoBioContainerItem">
                    <p>Активных пользователей</p>
                    <p>49</p>
                </div>
            </div>
        </div>
    )
}