import { useUserContext } from "../../contexts/UserContext";
import Loading from "../loading/Loading";

export default function Home() {
    const { loading } = useUserContext();
    return (
        <>
            {loading && <Loading />}
            <div>Home</div>
        </>
    );
}