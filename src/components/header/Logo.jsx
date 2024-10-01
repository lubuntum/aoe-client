import { useLocation } from "react-router-dom"

export const Logo = () => {
    const location = useLocation()
    return (<>
        <div className="headerLogo">
            <p className="logo">{location.pathname}</p>
        </div>
    </>)
}