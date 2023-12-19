import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../lib/axios";
import { Seat } from "../types/Seat";

export const useGetSeats = (id:string) => {
	return useQuery<{seats:Seat[]}, Error>({
		queryKey: ["seats"],
		queryFn: async () =>
			axiosInstance
				.get<{seats:Seat[]}>(`/seats/${id}`)
				.then((response) => {
					return response?.data;
				})
				.catch((error) => {
					throw new Error(error?.message);
				}),
	});
};
