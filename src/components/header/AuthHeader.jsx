import { useAuth } from "../../modules/auth/AuthProvider"
const AuthHeader = ()=>{
    const {logout, isAuth, getUsername} = useAuth()
    return(
        <div className="header-wrap">
            <div className="header-container">
                <div className="logo-container">
                    <i className="fas fa-thumbs-up"></i>
                </div>
                <div className="options">
                    {(isAuth && <div className="option">{getUsername()}</div>)}
                    {(isAuth && <div><a href="" onClick={()=>{logout()}}>Выход</a></div>)}
                </div>
            </div>
        </div>
    )
}

export default AuthHeader