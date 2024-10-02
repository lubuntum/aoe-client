import { useAuth } from "../../modules/auth/AuthProvider"
import Header from '../header/Header'

import "./account.css"
import "./userData.css"
import "./subData.css"
import "./partnerProg.css"
import "./changePass.css"
import "./userActivity.css"

import { UserData } from "./UserData"
import { SubData } from "./SubData"
import { PartnerProg } from "./PartnerProg"
import { ChangePass } from "./ChangePass"
import { UserActivity } from "./UserActivity"

const AccountInfo = () =>{
    const {isAuth, getUsername} = useAuth()

    return (<>
    <div className="accountWrapper">
        <Header/>

        <div className="accountTitle">Личный кабинет</div>

        <div className="accountContainer">
            <UserData/>
            <SubData/>
            <PartnerProg/>
            <ChangePass/>
            <UserActivity/>
        </div>

        <div className="accountTitle">Пройденные варианты</div>

        
    </div>
    </>)
}

export default AccountInfo