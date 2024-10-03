import "./account.css"

import { Header } from '../header/Header'
import { UserAccount } from "./user_account/UserAccount"
import { VariantsResults } from "./variants_results/VariantsResults"

import { useAuth } from "../../modules/auth/AuthProvider"

const AccountInfo = () =>{
    const {isAuth, getUsername} = useAuth()

    return (<>
        <div className="accountWrapper">
            <Header/>
            <UserAccount/>
            <VariantsResults/>
        </div>
    </>)
}

export default AccountInfo