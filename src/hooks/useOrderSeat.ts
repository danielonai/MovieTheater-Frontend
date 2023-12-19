import axiosInstance from "../lib/axios";
import { useMutation } from "@tanstack/react-query";

interface seatData {
    screenId: string;
    row:string;
    column:string;
}
interface Booking {
        id: string;
        userId: string;
        screeningId: string;
        bookedAt: Date;
}

const orderSeat = async (credentials: seatData): Promise<Booking> => {
	return axiosInstance.post(`/order`, credentials);
};

export const useOrderSeat = () => {
	return useMutation<Booking, unknown, seatData>({
		mutationFn: orderSeat,
		onSuccess: (data: Booking) => {
		},
        onError: (error) => {
            console.log("🚀 ~ file: useOrderSeat.ts:26 ~ useOrderSeat ~ error:", error)
        }
	});
};
