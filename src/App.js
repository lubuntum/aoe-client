import './App.css';
import './btns.css'
import "./components/reusible_components/css/scrollbar.css"

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from "./modules/auth_modules/ProtectedRoute"
import AuthProvider from "./modules/auth_modules/AuthProvider"
import { useAuth } from "./modules/auth_modules/AuthProvider"

import { MainPage } from "./components/main_page_components/MainPage"
import { AccountPage } from './components/account_page_components/AccountPage';
import { AdminPage } from "./components/admin_page_components/AdminPage"
import { PricingPage } from "./components/pricing_page_components/PricingPage"
import { VariantsPage } from "./components/variants_page_components/VariantsPage"

import { AutorizationPage } from './components/auth/AutorizationPage';
import { LessonSessionPage } from '../src/components/lesson_sesson/lesson_session_page/LessonSessionPage';

import { Results } from './components/lesson_sesson/lesson_session_result/Results';
import { TaskResult } from './components/lesson_sesson/lesson_session_result/TaskResult';

import routes from "./routes"

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
                <Route path={routes.HOME} element = {<ProtectedRoute component={<MainPage/>}/>}/>
                <Route path={routes.PRICING} element = {<ProtectedRoute component={<PricingPage/>}/>}/>

                <Route path={routes.TASK} element = {<ProtectedRoute component={<VariantsPage/>}/>}/>
                <Route path={routes.LESSON_SESSION} element = {<ProtectedRoute component={<LessonSessionPage/>}/>}/>
                <Route path={routes.RESULTS} element = {<ProtectedRoute component={<Results/>}/>}/>
                <Route path={routes.TASK_RESULT} element = {<ProtectedRoute component={<TaskResult/>}/>}/>
            </Routes>
        </div>
    )
}

export default App;
