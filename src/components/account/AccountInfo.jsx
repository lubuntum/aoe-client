import { useAuth } from "../../modules/auth/AuthProvider"
import Header from '../header/Header'

import "./account.css"

import { PersonalData } from "./PersonalData"
import { RecoverPass } from "./RecoverPass"

const AccountInfo = () =>{
    const {isAuth, getUsername} = useAuth()

    return (<>
    <div className="accountWrapper">
        <Header/>
        
        <div className="accountsDataContainer">
            <PersonalData/>
            <RecoverPass/>
            <div>3</div>
            <div>4</div>
            <div className="fifth">5</div>
        </div>
    </div>
    </>)
}

export default AccountInfo