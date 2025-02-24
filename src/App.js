import './App.css';
import "./common.css"
import "./colors.css"
import './btns.css'
import "./components/reusible_components/css/scrollbar.css"

import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import ProtectedRoute from "./modules/auth_modules/ProtectedRoute"
import AuthProvider from "./modules/auth_modules/AuthProvider"
import { ScrollToTop } from "./components/reusible_components/ScrollToTop"

import { PageTracking } from "./hooks/metrica/PageTracking"

import { MainPage } from "./components/main_page_components/MainPage"
import { AccountPage } from './components/account_page_components/AccountPage'
import { AdminPage } from "./components/admin_page_components/AdminPage"
import { PricingPage } from "./components/pricing_page_components/PricingPage"
import { VariantsPage } from "./components/variants_page_components/VariantsPage"

import { AutorizationPage } from './components/auth_page_components/AutorizationPage'
import { LessonSessionPage } from '../src/components/lesson_sesson/lesson_session_page/LessonSessionPage'

import { ExamComplitionResultsPage } from "./components/task_complition_results_components/ExamComplitionResultsPage"
import { TaskComplitionResultsPage } from "./components/task_complition_results_components/TaskComplitionResultsPage"

import { UserAgreement } from './components/documents_page_components/UserAgreement'
import { PrivacyPolice } from './components/documents_page_components/PrivacyPolice'

import routes from "./routes"
import { PartnerPage } from './components/partner_page_components/PartnerPage';
import { PaymentRedirect } from './components/payment_components/PaymentRedirect';
import { AdminAddVariantPage } from './components/admin_page_components/variants_components/AdminAddVariantPage';

function App() {
    return (
        <BrowserRouter>
            <ScrollToTop/>
            <AuthProvider>
                <Main/>
            </AuthProvider>
        </BrowserRouter>
    )
}

const Main = () => {
    PageTracking()

    return (
        <div className='pageWrapper'>
            <Routes>
                <Route path='/*'                               element = {<p>404 NOT FOUND</p>} />
                <Route path='/'                                element = {<Navigate to={routes.HOME} replace/>} />
                <Route path={routes.AUTORIZATION}              element = {<ProtectedRoute component={<AutorizationPage/>}/>}/>
                <Route path={routes.ACCOUNT}                   element = {<ProtectedRoute component={<AccountPage/>}/>}/>
                <Route path={routes.ADMIN}                     element = {<ProtectedRoute component={<AdminPage/>}/>}/>
                <Route path={routes.HOME}                      element = {<ProtectedRoute component={<MainPage/>}/>}/>
                <Route path={routes.PRICING}                   element = {<ProtectedRoute component={<PricingPage/>}/>}/>
                <Route path={routes.TASK}                      element = {<ProtectedRoute component={<VariantsPage/>}/>}/>
                <Route path={routes.LESSON_SESSION}            element = {<ProtectedRoute component={<LessonSessionPage/>}/>}/>
                <Route path={routes.RESULTS}                   element = {<ProtectedRoute component={<ExamComplitionResultsPage/>}/>}/>
                <Route path={routes.TASK_RESULT}               element = {<ProtectedRoute component={<TaskComplitionResultsPage/>}/>}/>
                <Route path={routes.PARTNERSHIP_AUTHORIZATION} element = {<ProtectedRoute component={<AutorizationPage/>}/>}/>
                <Route path={routes.PARTNER}                   element = {<ProtectedRoute component={<PartnerPage/>}/>}/>
                <Route path={routes.USER_AGREEMENT}            element = {<ProtectedRoute component={<UserAgreement/>}/>}/>
                <Route path={routes.PRIVACY_POLICE}            element = {<ProtectedRoute component={<PrivacyPolice/>}/>}/>
                <Route path={routes.PAYMENT_REDIRECT}          element = {<ProtectedRoute component={<PaymentRedirect/>}/>}/>
                <Route path={routes.ADD_VARIANT}               element = {<ProtectedRoute component={<AdminAddVariantPage/>}/>}/>
            </Routes>
        </div>
    )
}
export default App;
