import { useEffect, useState } from "react"
import { getActivityStatistics } from "../../../modules/api_modules/statisticsAPI"
import "../css/admin_statistics.css"

const statuses = {
    IDLE: "IDLE", 
    ERROR: "ERROR",
    SUCCESS: "SUCCESS"
}
export const ActivityStatisticsComponent = () => {
    const [status, setStatus] = useState(statuses.IDLE)
    const [statistics, setStatistics] = useState(null)
    useEffect(() => {
        loadActivityStatistics()
    }, [])
    const loadActivityStatistics = async () => {
        try{
            const response = await getActivityStatistics(localStorage.getItem("token"))
            setStatistics(response.data)
            console.log(response.data)
        } catch(err) {
            console.error(err)
            statuses.setStatus(err)
        }
    } 
    return (
        <>
        {status === statuses.ERROR && <p style={{color:'red'}}>Возникла ошибка при загрузке</p>}
        {status === statuses.SUCCESS && <p style={{color:'green'}}>Успешно</p>}
        {statistics ? 
            <div className="statistics-wrapper">
                <div className="statistics">
                    <p style={{color: statistics.customerStatistics.currentOnline !== 0 && "green"}}>Пользователей онлайн: {statistics.customerStatistics.currentOnline}</p>
                    <div className="common-statistics">
                        <p>Активных пользователей за <span>неделю</span>: {statistics.customerStatistics.activeCustomersByWeek}</p>
                        <p>Активных пользователей за <span>месяц</span>: {statistics.customerStatistics.activeCustomersByMonth}</p>
                        <p>Всего зарегистрировано аккаунтов: {statistics.customerStatistics.customersRegistered}</p>
                    </div>
                    
                </div>
                <div className="statistics">
                    <div className="common-statistics">
                        <p>Активных партнеров за <span>неделю</span>: {statistics.partnerStatistics.activePartnersByWeek}</p>
                        <p>Активных партнеров за <span>месяц</span>: {statistics.partnerStatistics.activePartnersByMonth}</p>
                        <p>Всего одобрено партнеров: {statistics.partnerStatistics.partners}</p>
                    </div>
                </div>
            </div> : <p>Загрузка</p>}
        
        </>
    )
}