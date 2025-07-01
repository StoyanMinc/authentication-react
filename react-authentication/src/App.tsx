
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import VerifyEmail from './components/verifyEmail/VerifyEmail';
import ForgotPassword from './components/forgot-password/ForgotPassword';
import ResetPassword from './components/resetPassword/ResetPassword';
import ChangePassword from './components/change-password/ChangePassword';

function App() {

    return (
        <div className='w-full h-full'>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='/verify-email/:token' element={<VerifyEmail />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/reset-password/:token' element={<ResetPassword />} />

                <Route element={<ProtectedLayout />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/change-password' element={<ChangePassword />} />
                </Route>

            </Routes>
        </div>
    )
}

export default App
