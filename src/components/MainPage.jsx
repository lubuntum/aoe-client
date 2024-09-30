import { useAuth } from "../modules/auth/AuthProvider"
import Header from '../components/header/Header';

const MainPage = () => {
    const {isAuth, getUsername} = useAuth()
    return (
        <>
            <Header/>
            {isAuth && <p> Привет {getUsername()}</p>}
            {!isAuth && <p> Гость </p>}
            <p>Main content</p>
        </>
    )
}

export default MainPage