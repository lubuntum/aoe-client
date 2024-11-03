import "../../App.css"
import "./account.css"

import { Header } from '../header/Header'
import { AccountUserGrid } from "./user/AccountUserGrid"
import { AccountResultsGrid } from "./variants_results/AccountResultsGrid"

const Account = () =>{

    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="accountWrapper">
                    <Header/>
                    <div className="accountContainer">
                        <p className="accountUserTitle">Личный кабинет</p>
                        <AccountUserGrid/>
                        <p className="accountResultsTitle">Пройденные варианты</p>
                        <AccountResultsGrid/>
                    </div>
                </div>
            </div>
        </div>
    </>)
}

export default Account