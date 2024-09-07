import { useAuth } from "./AuthProvider"
import { Navigate } from "react-router-dom";
const ProtectedRoute = ({component}) => {
    const {isAuth} = useAuth();
    if (!isAuth) return <Navigate to={"/login"}/>
    return component
}

export default ProtectedRoute