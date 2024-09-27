import { useAuth } from "../../modules/auth/AuthProvider"
const UnAuthHeader = ()=>{
    const {logout, isAuth, getUsername} = useAuth()
    return (
        <>
            <div className="header-wrap">
            <div className="header-container">
                <div className="logo-container">
                    <i className="fas fa-thumbs-up"></i>
                </div>
                <div className="options">
                    <button>Вход</button>
                </div>
            </div>
        </div>
        </>
    )
}

export default UnAuthHeader