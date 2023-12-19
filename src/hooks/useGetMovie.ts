import axiosInstance from "../lib/axios";
import { Movie } from "../types/Movie";
import { useQuery } from "@tanstack/react-query";

export const useGetMovie = (movieId: string) => {
	return useQuery<Movie, Error>({
		queryKey: ["movie", movieId],
		queryFn: async () =>
			axiosInstance
				.get<Movie>(`/movies/${movieId}`)
				.then((response) => {
					return response?.data;
				})
				.catch((error) => {
					throw new Error(error?.message);
				}),
	});
};
