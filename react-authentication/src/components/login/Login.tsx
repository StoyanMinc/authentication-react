import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center w-full h-full bg-gray-200">
            <form className="bg-white w-[30%] p-10 rounded-xl flex flex-col gap-4" action="">
                <h3 className="text-4xl self-center font-bold">Login</h3>
                <div className="flex flex-col">
                    <label htmlFor="email">Email</label>
                    <input className="border-1 border-gray-400 rounded-md px-4 py-2" placeholder="example@email.com" type="text" id="email" name="email" />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input className="border-1 border-gray-400 rounded-md px-4 py-2" placeholder="**********" type="password" id="password" name="password" />
                </div>

                <button className="bg-blue-400 w-full px-4 py-2 rounded-md text-white hover:bg-blue-500 transition duration-500 ease-in-out">Login</button>
                <p>You don't have an account? <Link to={'/register'} className="text-blue-400 font-bold ml-1">Register here</Link></p>
            </form>
        </div>

    );
}