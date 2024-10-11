import "./css/account_user_grid.css"

import "./css/user_info.css"
import "./css/user_subscription.css"
import "./css/user_promocode.css"
import "./css/user_password.css"
import "./css/user_activity.css"
import "./css/user_media.css"

import { UserInfo } from "./UserInfo"
import { UserSubscription } from "./UserSubscription"
import { UserPromocode } from "./UserPromocode"
import { UserPassword } from "./UserPassword"
import { UserActivity } from "./UserActivity"
import { useEffect, useState } from "react"
import { getCustomerData } from "../../../modules/api/account/AccountApi"

export const AccountUserGrid = () => {
    const [customer, setCustomer] = useState(undefined)
    const [error, setError] = useState(undefined);
    useEffect(() =>{
        const fetchData = async () =>{
            try{
                const token = localStorage.getItem("token")
                const response = await getCustomerData(token)
                setCustomer(response.data)
            } catch(err){
                setError("Ошибка при загрузке данных")
            }
            
        }
        fetchData()
    }, [])
    let result = undefined
    if (customer !== undefined) 
        result = <>
        <UserInfo customer={customer}/>
        <UserSubscription customer={customer}/>
        <UserPromocode/>
        <UserPassword/>
        <UserActivity/>
        </>
    else result = <p>Анимация загрузки данных пользователя...</p>
    return (<>
        <div className="accountUserGrid">
            {result}
        </div>
    </>)
}