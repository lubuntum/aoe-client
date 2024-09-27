import { useAuth } from "../../modules/auth/AuthProvider"
import UnAuthHeader from "./UnAuthHeader"
import AuthHeader from "./AuthHeader"
import "./header.css"
const Header = () => {
    const {logout, isAuth, getUsername} = useAuth()

    return(
        <>
            {(isAuth && <AuthHeader/>)}
            {(!isAuth && <UnAuthHeader/>)}
        </>
        
    )
}

export default Header