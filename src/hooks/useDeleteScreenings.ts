import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

type Credentials = {
	id: string;
	dates: string[];
};

const deleteScreenings = async (credentials: Credentials): Promise<Credentials> => {
	return axiosInstance.post(`/screenings/${credentials.id}`, credentials);
};

export const useDeleteScreenings = () => {
    
	return useMutation<Credentials, unknown, Credentials>({
		mutationFn: deleteScreenings,
		onSuccess: () => {},
		onError: (error) => {
			console.log("🚀 ~ file: usedeleteScreenings.ts:19 ~ usedeleteScreenings ~ error:", error);
		},
	});
};
