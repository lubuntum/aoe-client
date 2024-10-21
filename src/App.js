import Login from './components/auth/Login';
import './App.css';
import AuthProvider, { useAuth } from './modules/auth/AuthProvider';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './modules/auth/ProtectedRoute';
import AccountInfo from './components/account/AccountInfo';
import HomePage from './components/HomePage';
import TasksPage from './components/tasks/TasksPage'
import { LessonSessionPage } from './components/lesson_sesson/LessonSessionPage';
import routes from './routes';
import { Registration } from './components/auth/Registration';

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
          <Route path='/' element = {<Navigate to={routes.HOME} replace/>} />
          <Route path= {routes.LOGIN} element = {<ProtectedRoute component={<Login/>}/>}/>
          <Route path= {routes.REGISTER} element = {<ProtectedRoute component={<Registration/>}/>}/>

          <Route path= {routes.ACCOUNT} element = {<ProtectedRoute component={<AccountInfo/>}/>}/>
          <Route path={routes.HOME} element = {<ProtectedRoute component={<HomePage/>}/>} />

          <Route path={routes.TASK} element = {<ProtectedRoute component={<TasksPage/>}/>}/>
          <Route path={routes.LESSON_SESSION} element = {<ProtectedRoute component={<LessonSessionPage/>}/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App;
