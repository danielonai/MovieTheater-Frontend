import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";



const DeleteMovie = async (credentials: string): Promise<string> => {
	return axiosInstance.delete(`/movies/${credentials}`);
};

export const useDeleteMovie = () => {
	return useMutation<string, unknown, string>({
		mutationFn: DeleteMovie,
		onSuccess: (data: string) => {
		},
        onError: (error) => {
            console.log("🚀 ~ file: useDeleteMovie.ts:19 ~ useDeleteMovie ~ error:", error)
        }
	});
};
