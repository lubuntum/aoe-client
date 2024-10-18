import { useAuth } from "./AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import routes from "../../routes";
//Роуты куда может попасть неавторизованный пользователь
const unAuthRoutesAccess = [routes.HOME, routes.LOGIN, routes.REGISTER, routes.TASK]
const ProtectedRoute = ({component}) => {
    const {isAuth, loading} = useAuth();
    const location = useLocation()

    console.log(`protected route -> ${isAuth}, path = ${location.pathname}, loading = ${loading}`)
    if (loading) return null;
    
    console.log(location.pathname)
    if((location.pathname === routes.LOGIN || location.pathname === routes.REGISTER) && isAuth)
        return <Navigate to={routes.HOME}/>
    if(!unAuthRoutesAccess.includes(location.pathname) && !isAuth){
        console.log(`include -> ${!unAuthRoutesAccess.includes(location.pathname)}`)
        return <Navigate to={routes.LOGIN}/>
    }
    return component
}

export default ProtectedRoute