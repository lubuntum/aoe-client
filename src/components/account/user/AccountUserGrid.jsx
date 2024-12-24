import "./css/account_user_grid.css"

import "./css/user_info.css"
import "./css/user_loading.css"
import "./css/user_subscription.css"
import "./css/user_promocode.css"
import "./css/user_password.css"
import "./css/user_activity.css"
import "./css/user_media.css"

import { UserInfo } from "./UserInfo"
import { UserInfoLoading } from "./UserInfoLoading"
import { UserSubscription } from "./UserSubscription"
import { UserSubscriptionLoading } from "./UserSubscriptionLoading"
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
                console.log(`customer => ${response.data}`)
                setCustomer(response.data)
            } catch(err){
                setError("Ошибка при загрузке данных")
            }
        }
        fetchData()
    }, [])
    
    return (<>
        <div className="accountUserGrid">
            {customer !== undefined ? <UserInfo customer={customer}/> : <UserInfoLoading/>}
            {customer !== undefined ? <UserSubscription customer={customer}/> : <UserSubscriptionLoading/>}
            <UserPromocode/>
            <UserPassword/>
        </div>
    </>)
}