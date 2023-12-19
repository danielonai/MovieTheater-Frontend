import { useQuery } from "@tanstack/react-query";
import { Movie } from "../types/Movie";
import axiosInstance from "../lib/axios";

export const useGetMovies = () => {
	return useQuery<{movies:Movie[]}, Error>({
		queryKey: ["movies"],
		queryFn: async () =>
			axiosInstance
				.get<{movies:Movie[]}>(`/`)
				.then((response) => {
					return response?.data;
				})
				.catch((error) => {
					throw new Error(error?.message);
				}),
	});
};
