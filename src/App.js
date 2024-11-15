import Login from './components/auth/Login';
import './App.css';
import AuthProvider, { useAuth } from './modules/auth/AuthProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import AccountPage from './components/account/account_page/AccountPage';
import HomePage from './components/HomePage';
import TasksPage from './components/tasks/TasksPage'
import { LessonSessionPage } from '../src/components/lesson_sesson/lesson_session_page/LessonSessionPage';
import routes from './routes';
import { Registration } from './components/auth/Registration';
import { Results } from './components/lesson_sesson/lesson_session_result/Results';

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Main/>
            </AuthProvider>
        </BrowserRouter>
    )
}

const Main = () => {
    return (
        <div className='pageWrapper'>
            <Routes>
                <Route path='/*' element = {<p>404 NOT FOUND</p>} />
                <Route path='/' element = {<Navigate to={routes.HOME} replace/>} />
                <Route path= {routes.LOGIN} element = {<ProtectedRoute component={<Login/>}/>}/>
                <Route path= {routes.REGISTER} element = {<ProtectedRoute component={<Registration/>}/>}/>

                <Route path= {routes.ACCOUNT} element = {<ProtectedRoute component={<AccountPage/>}/>}/>
                <Route path={routes.HOME} element = {<ProtectedRoute component={<HomePage/>}/>} />

                <Route path={routes.TASK} element = {<ProtectedRoute component={<TasksPage/>}/>}/>
                <Route path={routes.LESSON_SESSION} element = {<ProtectedRoute component={<LessonSessionPage/>}/>}/>
                <Route path={routes.RESULTS} element = {<ProtectedRoute component={<Results/>}/>}/>
            </Routes>
        </div>
    )
}

export default App;
