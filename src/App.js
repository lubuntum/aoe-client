import "./App.css"

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"

import ProtectedRoute from "./modules/auth_modules/ProtectedRoute"
import AuthProvider from "./modules/auth_modules/AuthProvider"
import routes from "./routes"

import { ScrollToTop } from "./components/reusible_components/ScrollToTop"
import { Layout } from "./components/tme_reusable/Layout"
import { PageTracking } from "./hooks/metrica/PageTracking"

import { MainPage } from "./components/tme_main/MainPage"
import { CabinetPage } from "./components/tme_cabinet/CabinetPage"
import { AuthorizationPage } from "./components/tme_authorization/AuthorizationPage"
import { ResetPassword } from "./components/tme_authorization/ResetPassword"
import { EmailConfirm } from "./components/tme_authorization/EmailConfirm"
import { SessionPage } from "./components/tme_session/SessionPage"
import { VariantsPage } from "./components/tme_variants/VariantsPage"
import { SingleTaskResultPage } from "./components/tme_result/SingleTaskResultPage"
import { ExamResultPage } from "./components/tme_result/ExamResultPage"

import { AdminPage } from "./components/admin_page_components/AdminPage"
import { PricingPage } from "./components/pricing_page_components/PricingPage"

import { UserAgreement } from "./components/documents_page_components/UserAgreement"
import { PrivacyPolice } from "./components/documents_page_components/PrivacyPolice"

import { PartnerPage } from "./components/partner_page_components/PartnerPage"
import { PaymentRedirect } from "./components/payment_components/PaymentRedirect"
import { AdminAddVariantPage } from "./components/admin_page_components/variants_components/AdminAddVariantPage"
import { AdminEditVariantPage } from "./components/admin_page_components/variants_components/edit_variant/AdminEditVariantPage"
import { TestingPage } from "./components/testing_page_components/TestingPage"



function App() {
    return (
        <BrowserRouter>
            <ScrollToTop />
            <AuthProvider>
                <Main />
            </AuthProvider>
        </BrowserRouter>
    )
}

const Main = () => {
    PageTracking()

    return (<>
        <Layout>
            <Routes>
                <Route path="/*" element={<p>404 NOT FOUND</p>} />
                <Route path="/" element={<Navigate to={routes.HOME} replace />} />

                <Route path={routes.AUTORIZATION} element={<ProtectedRoute component={<AuthorizationPage />} />} />
                <Route path={routes.EMAIL_CONFIRM} element={<ProtectedRoute component={<EmailConfirm />} />} />
                <Route path={routes.RESET_PASSWORD} element={<ProtectedRoute component={<ResetPassword />} />} />

                <Route path={routes.ACCOUNT} element={<ProtectedRoute component={<CabinetPage />} />} />
                <Route path={routes.PARTNER} element={<ProtectedRoute component={<PartnerPage />} />} />
                <Route path={routes.ADMIN} element={<ProtectedRoute component={<AdminPage />} />} />
                <Route path={routes.BETA_TEST} element={<ProtectedRoute component={<TestingPage />} />} />

                <Route path={routes.USER_AGREEMENT} element={<ProtectedRoute component={<UserAgreement />} />} />
                <Route path={routes.PRIVACY_POLICE} element={<ProtectedRoute component={<PrivacyPolice />} />} />

                <Route path={routes.HOME} element={<ProtectedRoute component={<MainPage />} />} />
                <Route path={routes.TASK} element={<ProtectedRoute component={<VariantsPage />} />} />
                <Route path={routes.LESSON_SESSION} element={<ProtectedRoute component={<SessionPage />} />} />
                <Route path={routes.TASK_RESULT} element={<ProtectedRoute component={<SingleTaskResultPage />} />} />
                <Route path={routes.RESULTS} element={<ProtectedRoute component={<ExamResultPage />} />} />

                <Route path={routes.PRICING} element={<ProtectedRoute component={<PricingPage />} />} />
                <Route path={routes.PAYMENT_REDIRECT} element={<ProtectedRoute component={<PaymentRedirect />} />} />

                <Route path={routes.ADD_VARIANT} element={<ProtectedRoute component={<AdminAddVariantPage />} />} />
                <Route path={routes.EDIT_VARIANT} element={<ProtectedRoute component={<AdminEditVariantPage />} />} />
            </Routes>
        </Layout>
    </>)
}
export default App
