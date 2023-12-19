import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { MovieData } from "../components/MovieForm";
import { serverResponse } from "./useUpdateMovie";


const CreateMovie = async (credentials: MovieData): Promise<serverResponse> => {
	return axiosInstance.post(`/movies/create`, credentials);
};

export const useCreateMovie = () => {
	return useMutation<serverResponse, unknown, MovieData>({
		mutationFn: CreateMovie,
		onSuccess: (data: serverResponse) => {
		},
        onError: (error) => {
            console.log("🚀 ~ file: useCreateMovie.ts:17 ~ useCreateMovie ~ error:", error)
        }
	});
};
