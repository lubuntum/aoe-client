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

export const AccountUserGrid = () => {
    return (<>
        <div className="accountUserGrid">
            <UserInfo/>
            <UserSubscription/>
            <UserPromocode/>
            <UserPassword/>
            <UserActivity/>
        </div>
    </>)
}