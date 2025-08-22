import { useState } from "react";
import { Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import Loading from "../loading/Loading";

import { useUserContext } from "../../contexts/UserContext";
import { useRegister } from "../../hooks/useUser";

export default function Register() {

    const { loading } = useUserContext();
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showRepass, setShowRepass] = useState<boolean>(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        repass: ''
    });

    const validateField = (name: string, value: string) => {
        let message = "";
        switch (name) {
            case "email":
                if (!value) message = "Email is required";
                else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) message = "Invalid email format";
                break;
            case "username":
                if (!value) message = "Username is required";
                else if (value.length < 3) message = "Username must be at least 3 characters";
                break;
            case "password":
                if (!value) message = "Password is required";
                else if (value.length < 6) message = "Password must be at least 6 characters";
                break;
            case "repass":
                if (value !== formData.password) message = "Passwords do not match";
                break;
            default:
                break;
        }
        setErrors((prev) => ({ ...prev, [name]: message }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        validateField(name, value);
    };

    const register = useRegister();
    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await register(formData.email, formData.username, formData.password, formData.repass);
        if (!response) return
    };

    const isFormValid =
        Object.values(errors).every((err) => !err) &&
        Object.values(formData).every((val) => val.trim() !== "");

    return (
        <>
            {loading && <Loading />}
            <div className="flex flex-1 items-center justify-center w-full h-full bg-gray-200">
                <form
                    onSubmit={registerHandler}
                    className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4"
                >
                    <h3 className="text-4xl self-center font-bold">Register</h3>
                    <div className="flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            className={`border rounded-md px-4 py-2 ${errors.email ? "border-red-500" : "border-gray-400"}`}
                            placeholder="example@email.com"
                            type="text"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="username">Username</label>
                        <input
                            className={`border rounded-md px-4 py-2 ${errors.username ? "border-red-500" : "border-gray-400"}`}
                            placeholder="Ivan Ivanov"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <span className="text-red-500 text-sm">{errors.username}</span>}
                    </div>
                    <div className="relative flex flex-col gap-1">
                        <label htmlFor="password">Password</label>
                        <input
                            className={`border rounded-md px-4 py-2 ${errors.password ? "border-red-500" : "border-gray-400"}`}
                            placeholder="**********"
                            type={showPassword ? 'text' : "password"}
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                            onClick={() => setShowPassword((prev) => !prev)}
                        >{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                        {errors.password && <span className="text-red-500 text-sm">{errors.password}</span>}
                    </div>
                    <div className="relative flex flex-col">
                        <label htmlFor="repass">Repeat password</label>
                        <input
                            className={`border rounded-md px-4 py-2 ${errors.repass ? "border-red-500" : "border-gray-400"}`}
                            placeholder="**********"
                            type={showRepass ? 'text' : "password"}
                            id="repass"
                            name="repass"
                            value={formData.repass}
                            onChange={handleChange}
                        />
                        <span
                            className="absolute right-3 top-[38px] cursor-pointer text-gray-500 text-2xl"
                            onClick={() => setShowRepass((prev) => !prev)}
                        >{showRepass ? <FaEyeSlash /> : <FaEye />}</span>
                        {errors.repass && <span className="text-red-500 text-sm">{errors.repass}</span>}
                    </div>
                    <button
                        className={`w-full px-4 py-2 rounded-md text-white transition duration-500 ease-in-out
                        ${isFormValid ? "bg-blue-400 hover:bg-blue-500" : "bg-gray-400 cursor-not-allowed"}`}
                        disabled={!isFormValid}
                    >
                        Register
                    </button>
                    <p>You already have an account? <Link to={'/login'} className="text-blue-400 font-bold ml-1">login here</Link></p>
                </form>
            </div>
        </>
    );
}