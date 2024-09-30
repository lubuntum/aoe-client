import { useLocation } from "react-router-dom"

export const Logo = () => {
    const location = useLocation()
    return (<>
    <p className="logo">{ location.pathname }</p>
    </>
    )
}