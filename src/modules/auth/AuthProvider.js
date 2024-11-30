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
    
    useEffect(()=>{
        console.log(`${isAuth} -> ${loading}`)
        if (!isAuth && !loading) navigate(routes.AUTORIZATION)
    }, [isAuth, navigate]);
    

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true)
        navigate('/home')
    }
    const logout = () => {
        localStorage.clear()
        setIsAuth(false)
        navigate('/autorization')
    }
    const saveEmail = (email) => {
        localStorage.setItem(USER_EMAIL, email)
    }
    const getEmail = () => {
        if (isAuth) return localStorage.getItem(USER_EMAIL)
        return GUEST_NAME
    }
    
    return (
        <AuthContext.Provider value = {{isAuth, login, logout, saveEmail, getEmail, loading}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider