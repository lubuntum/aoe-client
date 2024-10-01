import { useAuth } from "./AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import routes from "../../routes";
const ProtectedRoute = ({component}) => {
    const {isAuth, loading} = useAuth();
    const location = useLocation()
    const navigate = Navigate(``)

    console.log(`protected route -> ${isAuth}, path = ${location.pathname}, loading = ${loading}`)
    if (loading) return null;
    console.log("after return null")
    if (!isAuth) return <Navigate to={routes.LOGIN}/>
    if((location.pathname === routes.LOGIN || location.pathname === routes.REGISTER) && isAuth)
        return <Navigate to={routes.HOME}/>
    //if (!isAuth) return <Navigate to={"/login"}/>
    return component
}

export default ProtectedRoute