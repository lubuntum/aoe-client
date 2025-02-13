import {createContext, useContext ,useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import { USER_DATA_KEY, USER_NAME, GUEST_NAME, USER_EMAIL} from "../../config";
import routes from '../../routes'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) =>{

    const [isAuth, setIsAuth] = useState(false);
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token && !isAuth) setIsAuth(true)
        setLoading(false)
    }, []);
    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true)
        navigate('/home')
    }
    const logout = () => {
        localStorage.removeItem("user_email")
        localStorage.removeItem("token")
        setIsAuth(false)
        navigate(`${routes.AUTORIZATION}`)
    }
    const saveEmail = (email) => {
        localStorage.setItem(USER_EMAIL, email)
    }
    const getEmail = () => {
        if (isAuth) return localStorage.getItem(USER_EMAIL)
        return GUEST_NAME
    }
    const checkAuth = () => {
        if (localStorage.getItem("token")){
            setIsAuth(true)
            return true
        }
        return false
    }
    
    return (
        <AuthContext.Provider value = {{isAuth, login, logout, saveEmail, getEmail, loading, checkAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider