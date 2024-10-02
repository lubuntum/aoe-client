import { useAuth } from "./AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import routes from "../../routes";
const unAuthRoutesAccess = [routes.HOME, routes.LOGIN, routes.REGISTER, routes.TASK]
const ProtectedRoute = ({component}) => {
    const {isAuth, loading} = useAuth();
    const location = useLocation()

    console.log(`protected route -> ${isAuth}, path = ${location.pathname}, loading = ${loading}`)
    if (loading) return null;
    console.log("after loading")
    //if (!isAuth) <Navigate to={routes.LOGIN}/>
    console.log("after !isAuth")
    if((location.pathname === routes.LOGIN || location.pathname === routes.REGISTER) && isAuth)
        return <Navigate to={routes.HOME}/>
    if(!unAuthRoutesAccess.includes(location.pathname) && !isAuth)
        return <Navigate to={routes.LOGIN}/>
    return component
}

export default ProtectedRoute