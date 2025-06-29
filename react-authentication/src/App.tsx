
import { Routes, Route, Link } from 'react-router-dom';
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {

    return (
        <div className='w-full h-full'>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    )
}

export default App
