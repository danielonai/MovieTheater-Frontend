import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

interface Credentials {
    file:File|null;
    id:string;
}

const UploadImage = async (credentials: Credentials): Promise<string> => {
	return axiosInstance.post(`/movies/${credentials.id}/upload-cover`, credentials);
};

export const useUploadImage = () => {
	return useMutation<string, unknown, Credentials>({
		mutationFn: UploadImage,
		onSuccess: (data: string) => {
		},
        onError: (error) => {
            console.log("🚀 ~ file: useUploadImage.ts:19 ~ useUploadImage ~ error:", error)
        }
	});
};
