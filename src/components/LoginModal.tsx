import React, { useState } from "react";
import { useAuthContext } from "../context/AuthContext";

interface LoginModalProps {
	onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
	const [isLogin, setIsLogin] = useState(true);
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, register } = useAuthContext();

	const handleToggle = () => {
		setIsLogin((prev) => !prev);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.length < 0 || password.length < 0) return
		if (isLogin) {
			try {
				login({
					email,
					password,
				});
			} catch (error) {
				console.log("🚀 ~ file: LoginModal.tsx:29 ~ handleSubmit ~ error:", error)
			}
		} else {
			try {
				register({
					username,
					email,
					password,
				});
			} catch (error) {
				console.log("🚀 ~ file: LoginModal.tsx:39 ~ handleSubmit ~ error:", error)
			}
		}
		onClose();
	};

	return (
		<div
			onClick={() => onClose()}
			className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50"
		>
			<div onClick={(ev) => ev.stopPropagation()} className="bg-white p-8 rounded-md w-96">
				<button
					onClick={onClose}
					className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 cursor-pointer"
				>
					X
				</button>

				<h2 className="text-2xl font-bold mb-4">{isLogin ? "Log In" : "Sign Up"}</h2>

				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<div className="mb-4">
							<label htmlFor="username" className="block text-sm font-medium text-gray-600">
								Username
							</label>
							<input
								type="text"
								id="username"
								name="username"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="mt-1 p-2 w-full border border-gray-300 rounded-md"
							/>
						</div>
					)}

					<div className="mb-4">
						<label htmlFor="email" className="block text-sm font-medium text-gray-600">
							Email
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md"
						/>
					</div>

					<div className="mb-4">
						<label htmlFor="password" className="block text-sm font-medium text-gray-600">
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="mt-1 p-2 w-full border border-gray-300 rounded-md"
						/>
					</div>

					<button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700">
						{isLogin ? "Log In" : "Sign Up"}
					</button>
				</form>
				<p className="mt-4 text-sm">
					{isLogin ? "Don't have an account?" : "Already have an account?"}
					<button onClick={handleToggle} className="ml-1 text-blue-500 hover:underline">
						{isLogin ? "Sign Up" : "Log In"}
					</button>
				</p>
			</div>
		</div>
	);
};

export default LoginModal;
