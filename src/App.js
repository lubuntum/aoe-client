
import './App.css';
import './btns.css'
import AuthProvider, { useAuth } from './modules/auth/AuthProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import AccountPage from './components/account/account_page/AccountPage';
import { AdminPage } from './components/admin/AdminPage';
import { TariffPage } from './components/tariff/TariffPage';
import { TariffPageConcept } from './components/tariff/TariffPageConcept';
import HomePage from './components/HomePage';
import TasksPage from './components/tasks/TasksPage'
import { AutorizationPage } from './components/auth/AutorizationPage';
import { LessonSessionPage } from '../src/components/lesson_sesson/lesson_session_page/LessonSessionPage';
import routes from './routes';
import { Results } from './components/lesson_sesson/lesson_session_result/Results';
import { TaskResult } from './components/lesson_sesson/lesson_session_result/TaskResult';

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
                <Route path= {routes.AUTORIZATION} element = {<ProtectedRoute component={<AutorizationPage/>}/>}/>

                <Route path={routes.ACCOUNT} element = {<ProtectedRoute component={<AccountPage/>}/>}/>
                <Route path={routes.ADMIN} element = {<ProtectedRoute component={<AdminPage/>}/>}/>
                <Route path={routes.HOME} element = {<ProtectedRoute component={<HomePage/>}/>}/>
                <Route path={routes.TARIFF} element = {<ProtectedRoute component={<TariffPage/>}/>}/>
                <Route path={routes.TARIFFTEMP} element = {<ProtectedRoute component={<TariffPageConcept/>}/>}/>

                <Route path={routes.TASK} element = {<ProtectedRoute component={<TasksPage/>}/>}/>
                <Route path={routes.LESSON_SESSION} element = {<ProtectedRoute component={<LessonSessionPage/>}/>}/>
                <Route path={routes.RESULTS} element = {<ProtectedRoute component={<Results/>}/>}/>
                <Route path={routes.TASK_RESULT} element = {<ProtectedRoute component={<TaskResult/>}/>}/>
            </Routes>
        </div>
    )
}

export default App;
