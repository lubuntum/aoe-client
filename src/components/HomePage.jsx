import { useAuth } from "../modules/auth/AuthProvider"
import Header from './header/Header';

const HomePage = () => {
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

export default HomePage