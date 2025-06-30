
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Login from './components/login/Login';
import Register from './components/register/Register';
import Home from './components/home/Home';
import ProtectedLayout from './components/protectedLayout/ProtectedLayout';
import VerifyEmail from './components/verifyEmail/VerifyEmail';

function App() {

    return (
        <div className='w-full h-full'>
            <Toaster />
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path='verify-email/:token' element={<VerifyEmail />} />
                <Route element={<ProtectedLayout />}>
                    <Route path='/' element={<Home />} />
                </Route>
            </Routes>
        </div>
    )
}

export default App
