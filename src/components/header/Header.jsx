import "./header.css"

import { Logo } from "./Logo";
import { Burger } from "./Burger"
import { Navbar } from "./Navbar";
import { Options } from "./Options";

export const Header = () => {
    return(
        <div className="headerWrapper">
            <div className="headerContainer">
                <Burger/>
                <Logo/>
                <Navbar/>
                <Options/>
            </div>
        </div>
    )
}

export default Header