import Login from './components/auth/Login';
import './App.css';
import AuthProvider, { useAuth } from './modules/auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import AccountInfo from './components/account/AccountInfo';
import HomePage from './components/HomePage';
import routes from './routes';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Main/>
      </AuthProvider>
    </BrowserRouter>
  );
}

const Main = () => {
  return (
    <div className='pageWrapper'>
      <div className='contentWrapper'>
        <Routes>
          <Route path='/*' element = {<p>404 NOT FOUND</p>} />
          <Route path= {routes.LOGIN} element = {<Login/>}/>
          <Route path= {routes.REGISTER} element = {<p>REGISTRATION</p>}/>

          <Route path= {routes.ACCOUNT} element = {<ProtectedRoute component={<AccountInfo/>}/>}/>
          <Route path={routes.HOME} element = {<ProtectedRoute component={<HomePage/>}/>} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
