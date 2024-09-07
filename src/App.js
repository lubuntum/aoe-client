import logo from './logo.svg';
import Login from './components/auth/Login';
import './App.css';
import AuthProvider, { useAuth } from './modules/auth/AuthProvider';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import AccountInfo from './components/account/AccountInfo';
import MainPage from './components/MainPage';
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
    <>
    <Routes>
      <Route path='*' element = {<Login/>} />
      <Route path='/account' element = {<ProtectedRoute component={<AccountInfo/>}/>}/>
      <Route path='/home' element = {<ProtectedRoute component={<MainPage/>}/>} />
    </Routes>
    </>
  )
}

export default App;
