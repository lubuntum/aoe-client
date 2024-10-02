import { useAuth } from "../../modules/auth/AuthProvider"
import Header from '../header/Header'

import "./account.css"

import { PersonalData } from "./PersonalData"
import { RecoverPass } from "./RecoverPass"
import { SubsRemain } from "./SubsRemain"
import { PartnerProgramm } from "./PartnerProgramm"
import { UserActivity } from "./UserActivity"

const AccountInfo = () =>{
    const {isAuth, getUsername} = useAuth()

    return (<>
    <div className="accountWrapper">
        <Header/>
        
        <div className="accountsDataContainer">
            <PersonalData/>
            <RecoverPass/>
            <SubsRemain/>
            <PartnerProgramm/>
            <UserActivity/>
        </div>
    </div>
    </>)
}

export default AccountInfo