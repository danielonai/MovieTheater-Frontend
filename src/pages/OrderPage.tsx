import React, { useEffect, useState } from "react";
import { Movie } from "../types/Movie";
import { Screening } from "../types/Screening";
import { Seat, SeatState } from "../types/Seat";
import { useLocation, useNavigate } from "react-router-dom";
import backBtn from "../assets/backBtn.png";
import { useOrderSeat } from "../hooks/useOrderSeat";
import { queryClient } from "../lib/react-query";
import GeneralMessageModal from "../components/GeneralMessageModal";
import { useGetSeats } from "../hooks/useGetSeats";

const OrderPage: React.FC = () => {
	const { state } = useLocation();
	const { movie, screening } = state as { movie: Movie; screening: Screening };
	const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);
	const [seatMap, setSeatMap] = useState<Seat[] | []>([]);
	const [isFinishedOrder, setIsFinishedOrder] = useState<boolean>(false);

	const { data: occoupiedSeats } = useGetSeats(screening.id);
	const { mutateAsync: orderSeatMutateAsync } = useOrderSeat();

	const navigate = useNavigate();

	useEffect(() => {
		createSeatMap();
	}, []);

	useEffect(() => {
		if (occoupiedSeats?.seats) {
			createSeatMap();
		}
	}, [occoupiedSeats]);

	const createSeatMap = () => {
		const seatsArray = Array.from({ length: 10 }, (_, rowIndex) =>
			Array.from({ length: 10 }, (_, seatIndex) => ({
				state:
					occoupiedSeats && occoupiedSeats?.seats.length > 0
						? checkForOccupiedSeats((rowIndex + 1).toString(), (seatIndex + 1).toString())
						: SeatState.AVAILABLE,
				row: `${rowIndex + 1}`,
				column: `${seatIndex + 1}`,
				deleted: false,
				screening: null!,
			}))
		).flat();

		setSeatMap(seatsArray);
	};

	const checkForOccupiedSeats = (row: string, column: string) => {
		if (!occoupiedSeats) return SeatState.AVAILABLE;
		const occupied = occoupiedSeats?.seats.map((s) => [s.row, s.column]);
		if (occupied?.some((s) => JSON.stringify(s) === JSON.stringify([row, column]))) return SeatState.OCCUPIED;
		return SeatState.AVAILABLE;
	};

	const bookSeat = async () => {
		if (!selectedSeat) return;
		try {
			await orderSeatMutateAsync(
				{ screenId: screening.id, row: selectedSeat.row, column: selectedSeat.column },
				{
					onSuccess: () => {
						queryClient.invalidateQueries({ queryKey: ["movies"], refetchType: "all" });
						setIsFinishedOrder(true);
					},
					onError: (err) => {
						console.log("🚀 ~ file: OrderPage.tsx:54 ~ bookSeat ~ err:", err);
					},
				}
			);
		} catch (error) {
			console.log("🚀 ~ file: OrderPage.tsx:58 ~ bookSeat ~ error:", error);
		}
	};

	return (
		<div className="container mx-auto">
			{isFinishedOrder && (
				<GeneralMessageModal
					title="Success"
					message="your order was succesfull"
					onClose={() => navigate("/")}
				/>
			)}
			<img
				src={backBtn}
				alt={"back home"}
				className=" cursor-pointer w-20 h-20 object-cover absolute top-30 left-20"
				onClick={() => navigate("/")}
			/>
			<div className="flex flex-col items-center">
				<img src={movie.cover} alt={movie.title + " cover image"} className="w-64 h-64 object-cover mb-2" />
				<h2 className="text-2xl font-bold mb-2">{movie.title}</h2>
				<p className="text-gray-500 mb-2">duration: {movie.duration}</p>
				<p className="text-gray-700 mb-2">{movie.description}</p>

				<div className="flex items-center mb-2">
					<p className="text-gray-700 mr-2">Selected date and time:</p>
					<p className="text-blue-500 underline">
						{new Date(screening.date).toLocaleString("en-IL", {
							weekday: "long",
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "numeric",
							minute: "numeric",
						})}
					</p>
				</div>
				{selectedSeat && (
					<div className="mt-2 mb-4 flex flex-col items-center">
						<p className="text-gray-700 ">
							<span className=" text-sky-500 underline font-bold">Selected Seat:</span> row:{" "}
							{selectedSeat.row} seat number: {selectedSeat.column}
						</p>
						<button onClick={bookSeat} className="bg-sky-500 text-white px-4 py-2 mt-2 self-center">
							Book Seat
						</button>
					</div>
				)}
				<div className="flex flex-col items-center mb-4">
					<div className="flex gap-2 ml-10">
						{Array.from({ length: 10 }).map((_, index) => (
							<div key={index} className="w-10 h-10 flex items-center justify-center">
								{index + 1}
							</div>
						))}
					</div>
					<div className="flex flex-row gap-2">
						<div className="flex flex-col gap-2">
							{Array.from({ length: 10 }).map((_, index) => (
								<div key={index} className="w-10 h-10 flex items-center justify-center">
									{index + 1}
								</div>
							))}
						</div>
						<div className="grid grid-cols-10 gap-2">
							{seatMap.map((seat: any) => (
								<div
									key={seat.row + Math.random() * 2}
									className={`w-10 h-10  ${
										selectedSeat?.row === seat.row && selectedSeat?.column === seat.column
											? "bg-sky-500"
											: seat.state === SeatState.AVAILABLE
											? "bg-gray-300 cursor-pointer"
											: "bg-red-500"
									}`}
									onClick={() =>
										seat.state === SeatState.AVAILABLE ? setSelectedSeat(seat) : alert("This seat is taken")
									}
								></div>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
