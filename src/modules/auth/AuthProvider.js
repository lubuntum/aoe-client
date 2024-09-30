import {createContext, useContext ,useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"

import { USER_DATA_KEY, USER_NAME, GUEST_NAME} from "../../config";
import { ACCOUNT } from "../../config";
import { LOGIN } from "../../config";
import { HOME } from "../../config";

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) =>{

    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) setIsAuth(true)
    }, []);
    /*
    useEffect(()=>{
        if (!isAuth) navigate(HOME)
    }, [isAuth]);
    */

    const login = (token) => {
        localStorage.setItem('token', token);
        setIsAuth(true)
        navigate('/home')
    }
    const logout = () => {
        localStorage.clear()
        setIsAuth(false)
        navigate('/login')
    }
    const saveUsername = (name) => {
        localStorage.setItem(USER_NAME, name)
    }
    const getUsername = () => {
        if (isAuth) return localStorage.getItem(USER_NAME)
        return GUEST_NAME
    }
    return (
        <AuthContext.Provider value = {{isAuth, login, logout, saveUsername, getUsername}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider