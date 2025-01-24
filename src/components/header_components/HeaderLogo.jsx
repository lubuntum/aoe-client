import React, { useCallback } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import routes from "../../routes.js"

export const HeaderLogo = React.memo(() => {
    const navigate = useNavigate()
    const location = useLocation()

    const handleClick = useCallback(() => {
        if (location.pathname === routes.HOME) {
            window.scrollTo(0, 0)
        } else {
            navigate(routes.HOME)
        }
    }, [location.pathname, navigate])

    return (
        <div className="headerLogoContainer">
            <p className="logo" onClick={handleClick}>TestMy<span>Eng</span></p>
        </div>
    )
})