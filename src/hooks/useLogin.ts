import { queryClient } from "../lib/react-query";
import axiosInstance from "../lib/axios";
import { LoginCredentials } from "../types/LoginCredentials";
import { useMutation } from "@tanstack/react-query";
import { User } from "../types/User";

const loginUser = async (credentials: LoginCredentials): Promise<User> => {
	return axiosInstance.post("/login", credentials);
};

export const useLogin = () => {
	return useMutation<User, unknown, LoginCredentials>({
		mutationKey:['user'],
		mutationFn: loginUser,
		onSuccess: (data: User) => {
			
			axiosInstance.defaults.headers.common["Authorization"] = data.token;
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
