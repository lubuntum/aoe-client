import "./account.css"

import { Header } from '../header/Header'
import { AccountUserGrid } from "./user/AccountUserGrid"
import { AccountResultsGrid } from "./variants_results/AccountResultsGrid"

const AccountInfo = () =>{

    return (<>
        <div className="accountWrapper">
            <Header/>
            <div className="accountContainer">
                <p className="accountUserTitle">Личный кабинет</p>
                <AccountUserGrid/>
                <AccountResultsGrid/>
            </div>
        </div>
    </>)
}

export default AccountInfo