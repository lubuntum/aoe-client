import { useLocation } from "react-router-dom"

export const HeaderLogo = () => {
    const location = useLocation()
    
    return (<>
        <div className="headerLogoContainer">
            <p className="logo">LOGO</p>
        </div>
    </>)
}