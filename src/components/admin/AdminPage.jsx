import "../../App.css"
import "./css/admin.css"

import { Header } from "../header/Header"

export const AdminPage = () => {
    return (<>
        <div className="sectionWrapper">
            <div className="contentWrapper">
                <div className="adminWrapper">
                    <Header/>
                </div>
            </div>
        </div> 
    </>)
}