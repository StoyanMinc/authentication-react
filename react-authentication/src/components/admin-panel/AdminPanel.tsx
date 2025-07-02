import { useEffect } from "react";
import { useGetUsers } from "../../hooks/useUser";

export default function AdminPanel() {
    const getUsers = useGetUsers();
    
    useEffect(() => {
        (async () => {
            const users = await getUsers();
            console.log(users);
        })()
    },[])
  return (
      <div>admin panel</div>
  );
}