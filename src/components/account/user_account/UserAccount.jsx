import "./css/user_account.css"

import { UserData } from "./UserData"
import { SubData } from "./SubData"
import { PartnerProg } from "./PartnerProg"
import { ChangePass } from "./ChangePass"
import { UserActivity } from "./UserActivity"

export const UserAccount = () => {
    return (<>
        <div className="accountTitle">Личный кабинет</div>
        <div className="accountContainer">
            <UserData/>
            <SubData/>
            <PartnerProg/>
            <ChangePass/>
            <UserActivity/>
        </div>
    </>)
}