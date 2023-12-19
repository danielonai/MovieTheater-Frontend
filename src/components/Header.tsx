import React, { useEffect, useState } from "react";
import Logo from "../assets/codeLoversLogo.png";
import LoginModal from "./LoginModal";
import { User } from "../types/User";
import axiosInstance from "../lib/axios";
import { useGetUser } from "../hooks/useGetUser";

const Header: React.FC = () => {
	const [isLogin, setIsLogin] = useState<boolean>(false);

	const user: User | null = useGetUser();

	useEffect(() => {
		if (user) {
			axiosInstance.defaults.headers.common["Authorization"] = user.token;
		}
	}, [user]);

	return (
		<header className="flex flex-col items-center justify-center w-full h-1/4">
			{user ? (
				<p className="absolute left-12 top-3 font-bold">Hi {user?.user?.username}, welcome back!</p>
			) : (
				<p
					onClick={() => setIsLogin(true)}
					className="absolute left-12 top-3 underline text-cyan-600 cursor-pointer"
				>
					Log In / Sign Up
				</p>
			)}

			<img src={Logo} alt="Code Lovers Logo" className="mb-4" />
			<h1 className="text-4xl font-bold mb-2">Movie Theater App</h1>
			<div className="border-b w-[90%] border-black mb-4 opacity-50 mt-3"></div>
			{isLogin && <LoginModal onClose={() => setIsLogin(false)} />}
		</header>
	);
};

export default Header;
