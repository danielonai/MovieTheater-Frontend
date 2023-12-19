import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";


type Credentials = {
    movieId: string
    dates: Date[]
}

type serverResponse =  {
    message: string
}

const createScreenings = async (credentials: Credentials): Promise<serverResponse> => {
	return axiosInstance.post(`/screenings/${credentials.movieId}`, credentials);
};

export const useCreateScreenings = () => {
	return useMutation<serverResponse, unknown, Credentials>({
		mutationFn: createScreenings,
		onSuccess: (data: serverResponse) => {
		},
        onError: (error) => {
            console.log("🚀 ~ file: useCreateScreenings.ts:19 ~ usecreateScreenings ~ error:", error)
        }
	});
};
