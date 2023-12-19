import { queryClient } from "../lib/react-query";
import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";
import { MovieData } from "../components/MovieForm";
import { Movie } from "../types/Movie";

export interface serverResponse {
	data: {
		message: string;
		movie: Movie;
	};
}

const UpdateMovie = async (credentials: MovieData): Promise<serverResponse> => {
	return axiosInstance.put(`/movies/${credentials.id}`, credentials);
};

export const useUpdateMovie = () => {
	return useMutation<serverResponse, unknown, MovieData>({
		mutationFn: UpdateMovie,
		onSuccess: ({ data }: serverResponse) => {
			console.log("🚀 ~ file: useUpdateMovie.ts:27 ~ useUpdateMovie ~ data:", data);
			queryClient.invalidateQueries({ queryKey: ["movie", data.movie.id], refetchType: "all" });
		},
		onError: (error) => {
			console.log("🚀 ~ file: useUpdateMovie.ts:25 ~ useUpdateMovie ~ error:", error);
		},
	});
};
