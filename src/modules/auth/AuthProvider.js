import {useState, useEffect} from "react";
import {useNavigate} from "react-router-dom"
import { USER_DATA_KEY, USER_NAME, GUEST_NAME} from "../../config";
const AuthProvider = ({children}) =>{
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if (token) setIsAuth(true)
    }, [])

    useEffect(()=>{
        if (isAuth) navigate('/home')
    }, [isAuth])

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
    const saveUserName = (name) => {
        localStorage.setItem(USER_NAME, name)
    }
    const getUserName = () => {
        if (isAuth) return localStorage.getItem(USER_NAME)
        return GUEST_NAME
    }
    return (
        <AuthProvider.Provider value = {{isAuth, login, logout, saveUserName, getUserName}}>
            {children}
        </AuthProvider.Provider>
    )
}