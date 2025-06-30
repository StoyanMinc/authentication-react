import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
const BASE_URL = import.meta.env.VITE_SERVER_URL;
import { useUserContext } from '../contexts/UserContext';


export const useRegister = () => {
    const { setLoading } = useUserContext();
    const register = async (email: string, username: string, password: string, repass: string) => {
        if (!email || !username || !password || !repass) {
            return toast.error('All fields are required!');
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return
        }
        if (password !== repass) {
            return toast.error('Passwords don\'t match!');
        }
        setLoading(true)
        try {
            await axios.post(`${BASE_URL}/api/user/register`, {
                email: email,
                username: username,
                password: password
            }, { withCredentials: true });

            await axios.post(`${BASE_URL}/api/user/verify-email`, {}, { withCredentials: true });
            toast('Check your email for verifying your account', {
                icon: '❗',
                style: {
                    border: '1px solid orange',
                    padding: '16px',
                    color: 'orange',
                },
                duration: 4000,
            });
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    }

    return register;
}

export const useLogin = () => {
    const navigate = useNavigate()
    const { setUser, setLoading } = useUserContext();
    const login = async (email: string, password: string) => {
        if (!email || !password) {
            return toast.error('All fields are required!');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error('Please enter a valid email address.');
            return
        }
        setLoading(true)
        try {
            const response = await axios.post(`${BASE_URL}/api/user/login`, {
                email: email,
                password: password
            }, { withCredentials: true });

            if (!response.data.isVerified) {
                await axios.post(`${BASE_URL}/api/user/verify-email`, {}, { withCredentials: true });
                return toast('Check your email for verifying your account', {
                    icon: '❗',
                    style: {
                        border: '1px solid orange',
                        padding: '16px',
                        color: 'orange',
                    },
                    duration: 4000,
                });

            };

            toast.success('Login successfully!');
            setUser({
                username: response.data.username,
                email: response.data.email,
                _id: response.data._id,
                photo: response.data.photo,
                isVerified: response.data.isVerified,
                role: response.data.role,
                bio: response.data.bio,
            });
            navigate('/');
        } catch (error: any) {
            console.log('Error login user:', error);
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }

    }
    return login
}

export const useVerifyEmail = () => {
    const navigate = useNavigate()

    const verifyEmail = async (token: string) => {
        if (!token) {
            return toast.error('No token provided!');
        }
        try {
            await axios.post(`${BASE_URL}/api/user/verify-user/${token}`, {}, { withCredentials: true });
            toast.success('You successfully verified your email!');
            navigate('/');
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    return verifyEmail;
}