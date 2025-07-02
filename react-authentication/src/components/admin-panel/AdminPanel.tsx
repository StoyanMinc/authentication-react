import { useEffect, useState } from "react";
import { useDeleteUser, useGetUsers } from "../../hooks/useUser";
import type { User } from "../../../types/user";

import { formatUserDate } from '../../../utils/formatDates'

export default function AdminPanel() {
    const deleteUser = useDeleteUser();
    const getUsers = useGetUsers();
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        (async () => {
            const response = await getUsers();
            setUsers(response);
            console.log(response);
        })()
    }, [])

    const deleteUserHandler = async (id: string) => {
        const response = await deleteUser(id)
        if (!response) return;
        setUsers((prev) => prev.filter((user) => user._id !== id));
    }
    return (
        <div className="flex h-full w-full bg-gray-200 flex-col p-2">
            <h2 className="text-4xl">Admin panel</h2>
            <div className="flex">
                <div className="flex flex-col w-full mt-4">
                    <h3 className="text-2xl mb-3 self-center">User list</h3>
                    <div>
                        <ul className="flex gap-3">
                            {users.map((user) => (
                                <li key={user._id} className="flex flex-col border rounded-md bg-white p-2 gap-1">
                                    <p>Email: <span className="font-bold">{user.email}</span></p>
                                    <p>Name: <span className="font-bold">{user.username}</span></p>
                                    <p>Bio: <span className="font-bold">{user.bio}</span></p>
                                    <p>Role: <span className="font-bold">{user.role}</span></p>
                                    <p>Is verified: <span className={`font-bold ${user.isVerified ? 'text-green-600' : 'text-red-600'}`}>{`${user.isVerified ? 'Yes' : 'No'}`}</span></p>
                                    <p>Created at: <span className="font-bold">{formatUserDate(user.createdAt)}</span></p>
                                    <button
                                        onClick={() => deleteUserHandler(user._id)}
                                        className="bg-red-500 self-center px-2 py-1 rounded-md text-white hover:bg-red-600">
                                        delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}