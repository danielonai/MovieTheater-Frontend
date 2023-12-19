import { useMutation } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { queryClient } from "../lib/react-query";
import { RegisterCredentials } from "../types/RegisterCredentials";
import { User } from "../types/User";

const registerUser = async (credentials: RegisterCredentials): Promise<User> => {
	return axiosInstance.post("/register", credentials);
};

export const useRegister = () => {
	return useMutation<User, unknown, RegisterCredentials>({
		mutationFn: registerUser,
		onSuccess: (data: User) => {
			axiosInstance.defaults.headers.common["Authorization"] = data.token;
			queryClient.invalidateQueries({ queryKey: ["user"] });
		},
	});
};
