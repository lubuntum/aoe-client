import { useAuth } from "./AuthProvider"
import { Navigate, useLocation } from "react-router-dom";
import routes from "../../routes";
//Роуты куда может попасть неавторизованный пользователь
const unAuthRoutesAccess = [routes.HOME, 
                            routes.AUTORIZATION, 
                            routes.PARTNERSHIP_AUTHORIZATION, 
                            routes.TASK, 
                            routes.RESULTS, 
                            routes.TASK_RESULT, 
                            routes.LESSON_SESSION,
                            routes.USER_AGREEMENT,
                            routes.PRIVACY_POLICE]
const ProtectedRoute = ({component}) => {
    const {isAuth, loading} = useAuth();
    const location = useLocation()

    console.log(`protected route -> ${isAuth}, path = ${location.pathname}, loading = ${loading}`)
    if (loading) return null;
    
    if(((location.pathname === routes.AUTORIZATION) || (location.pathname === routes.PARTNERSHIP_AUTHORIZATION)) && isAuth)
        return <Navigate to={routes.HOME}/>
    if(!unAuthRoutesAccess.includes(location.pathname) && !isAuth){
        console.log(`include -> ${!unAuthRoutesAccess.includes(location.pathname)}`)
        return <Navigate to={routes.AUTORIZATION}/>
    }
    console.log(`GO TO COMPONENT, ${location.pathname}`)
    return component
}

export default ProtectedRoute