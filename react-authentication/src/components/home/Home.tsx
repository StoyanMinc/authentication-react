import { Link } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import Loading from "../loading/Loading";

export default function Home() {
    const { loading } = useUserContext();
    return (
        <>
            {loading && <Loading />}
            <div className="fixed flex">
                <nav>
                    <Link to='/change-password'>
                    change password
                    </Link>
                </nav>
            </div>
            <div className="flex flex-1 flex-col items-center justify-center w-full h-[100%] bg-gray-200">
                Home page
            </div>
        </>
    );
}