import { useContext } from "react";
import { User } from "../types/User";
import AuthContext from "../context/AuthContext";



export const useGetUser = () => {
    const storedUserString: string | null = sessionStorage.getItem("movieTheaterUser");
	const contextUser: User | null | undefined = useContext(AuthContext)?.user;
	const user: User | null = contextUser || (storedUserString ? JSON.parse(storedUserString) : null);
    return user
}