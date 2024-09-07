import { useAuth } from "../modules/auth/AuthProvider"

const MainPage = () => {
    const {isAuth, getUsername} = useAuth()
    return (
        <>
        {isAuth && <p> Привет {getUsername()}</p>}
        {!isAuth && <p> Гость </p>}
        <p>Main content</p>
        </>
    )
}

export default MainPage