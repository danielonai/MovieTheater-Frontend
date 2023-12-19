import React, { useState, createContext, useContext } from "react";
import { LoginCredentials } from "../types/LoginCredentials";
import { RegisterCredentials } from "../types/RegisterCredentials";
import { User } from "../types/User";
import { useLogin } from "../hooks/useLogin";
import { useRegister } from "../hooks/useRegister";

interface AuthContextProps {
	user: User | null;
	login: (credentials: LoginCredentials) => void;
	register: (credentials: RegisterCredentials) => void;
	generalMessage: boolean;
	setGeneralMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuthContext = (): AuthContextProps => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuthContext must be used within a AuthProvider");
	}
	return context;
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [user, setUser] = useState<User | null>(null);
	const [generalMessage, setGeneralMessage] = useState<boolean>(false);

	const { mutateAsync: loginMutateAsync } = useLogin();
	const { mutateAsync: registerMutateAsync } = useRegister();

	const login = async  (credentials: LoginCredentials) => {
		await loginMutateAsync(credentials, {
			onSuccess: (data :any) => {
				setUser(data.data);
				sessionStorage.setItem('movieTheaterUser', JSON.stringify(data.data))
			},
			onError: (err) => {
				console.log("🚀 ~ file: AuthContext.tsx:47 ~ login ~ err:", err);
			},
		});
	};

	const register = async (credentials: RegisterCredentials) => {
		await registerMutateAsync(credentials, {
			onSuccess: (data :any) => {
				setUser(data.data);
				sessionStorage.setItem('movieTheaterUser', JSON.stringify(data.data))
			},
			onError: (err) => {
				console.log("🚀 ~ file: AuthContext.tsx:47 ~ login ~ err:", err);
			},
		});
	};


	return (
		<AuthContext.Provider
			value={{
				user,
				login,
				register,
				generalMessage,
				setGeneralMessage
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export default AuthContext;

