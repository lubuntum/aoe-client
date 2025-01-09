import "./css/account.css"
import "./css/user.css"
import "./css/results.css"
import "../reusible_components/css/input.css"

import { getCustomerData } from "../../modules/api_modules/accountAPI"

import { useEffect, useState } from "react"

import { HeaderMain } from "../header_components/HeaderMain"
import { PageTitle } from "../reusible_components/PageTitle"
import { UserInfo } from "./user_components/UserInfo"
import { UserInfoLoading } from "./user_components/UserInfoLoading"
import { UserSubscription } from "./user_components/UserSubscription"
import { UserSubscriptionLoading } from "./user_components/UserSubscriptionLoading"
import { UserPromocode } from "./user_components/UserPromocode"
import { UserChangePassword } from "./user_components/UserChangePassword"
import { ResultsGrid } from "./result_components/ResultsGrid"



export const AccountPage = () =>{
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
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="accountWrapper">
                    <HeaderMain/>
                    <div className="accountGrid">
                        <PageTitle pageTitleText={"Личный кабинет"} className={"accountGridItem1"}/>

                        {customer !== undefined ? <UserInfo customer={customer} className={"accountGridItem2"}/> : 
                                                  <UserInfoLoading className={"accountGridItem2"}/>}

                        {customer !== undefined ? <UserSubscription customer={customer} className={"accountGridItem3"}/> : 
                                                  <UserSubscriptionLoading className={"accountGridItem3"}/>}

                        <UserPromocode className={"accountGridItem4"}/>

                        <UserChangePassword className={"accountGridItem5"}/>

                        <PageTitle pageTitleText={"Пройденные варианты"} className={"accountGridItem6"}/>

                        <ResultsGrid className={"accountGridItem7"}/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}