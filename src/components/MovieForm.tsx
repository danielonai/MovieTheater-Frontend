import React, { useState } from "react";
import { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";
import { useUpdateMovie } from "../hooks/useUpdateMovie";
import { useCreateMovie } from "../hooks/useCreateMovie";
import { queryClient } from "../lib/react-query";
import DatePicker from "react-datepicker";
import { useDeleteScreenings } from "../hooks/useDeleteScreenings";

export interface MovieData {
	id?: string;
	title: string;
	duration: string;
	description: string;
	screenings?: { date: Date }[];
}

type props = {
	movie?: Movie;
};

const MovieForm: React.FC<props> = ({ movie }) => {
	const [formData, setFormData] = useState<MovieData>({
		title: movie?.title || "",
		duration: movie?.duration || "",
		description: movie?.description || "",
	});

	const [startDate, setStartDate] = useState<Date>(new Date());

	const [screeningDates, setScreeningDates] = useState<{ date: Date; id: string }[]>(
		movie?.screenings.map((s: any) => {
			return { date: new Date(s.date), id: s.id };
		}) || []
	);
	const [newScreeningsDates, setNewScreeningsDates] = useState<{ date: Date }[]>([]);
	const [deletedScreenings, setDeletedScreenings] = useState<string[]>([]);

	const isEdit: boolean = movie ? true : false;

	const { mutateAsync: editMutateAsync } = useUpdateMovie();
	const { mutateAsync: createMutateAsync } = useCreateMovie();
	const { mutateAsync: deleteScreeningsMutateAsync } = useDeleteScreenings();

	const navigate = useNavigate();

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleDescriptionChange = (e: any) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onAddDate = () => {
		if (startDate.getTime() < new Date().getTime()) return alert("The date you've selected has past");
		setScreeningDates([...screeningDates, { date: startDate, id: Math.random().toString() }]);
		setNewScreeningsDates([...newScreeningsDates, { date: startDate }]);
		setFormData({
			...formData,
			screenings: [...newScreeningsDates, { date: startDate }],
		});
	};

	const onDeleteScreening = (id: string, date: Date) => {
		setScreeningDates(screeningDates.filter((s) => s.id !== id));

		setDeletedScreenings([...deletedScreenings, date.toISOString()]);
	};

	const handleEditMovie = async () => {
		const dataForUpdate = { ...formData, id: movie?.id };
		if (!dataForUpdate.screenings) dataForUpdate.screenings = newScreeningsDates;
		try {
			await editMutateAsync(dataForUpdate, {
				onSuccess: async () => {
					queryClient.invalidateQueries({ queryKey: ["movies"], refetchType: "all" });
					if (deletedScreenings.length > 0) {
						try {
							await deleteScreeningsMutateAsync(
								{ dates: deletedScreenings, id: movie!.id },
								{
									onSuccess: () => {
										queryClient.invalidateQueries({ queryKey: ["movies"], refetchType: "all" });
									},
									onError: (err) => {
										console.log("🚀 ~ file: MovieForm.tsx:94 ~ onSuccess: ~ err:", err);
									},
								}
							);
						} catch (error) {
							console.log("🚀 ~ file: MovieForm.tsx:118 ~ onSuccess: ~ error:", error);
						}
					}
					navigate("/");
				},
				onError: (err) => {
					console.log("🚀 ~ file: MovieForm.tsx:122 ~ handleEditMovie ~ err:", err);
				},
			});
		} catch (error) {
			console.log("🚀 ~ file: MovieForm.tsx:126 ~ handleEditMovie ~ error:", error);
		}
	};

	const handleSubmitMovie = async () => {
		if (
			screeningDates.length === 0 ||
			formData.title.length < 1 ||
			formData.duration.length < 1 ||
			formData.description.length < 1
		) {
			return;
		}
		if (isEdit) {
			handleEditMovie();
		} else {
			const dataForCreate = { ...formData };
			if (!dataForCreate.screenings) dataForCreate.screenings = newScreeningsDates;
			try {
				await createMutateAsync(formData, {
					onSuccess: async ({ data }) => {
						queryClient.invalidateQueries({ queryKey: ["movies"], refetchType: "all" });
						navigate("/");
					},
					onError: (err) => {
						console.log("🚀 ~ file: MovieForm.tsx:161 ~ handleSubmitMovie ~ err:", err);
					},
				});
			} catch (error) {
				console.log("🚀 ~ file: MovieForm.tsx:165 ~ handleSubmitMovie ~ error:", error);
			}
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-2xl font-bold mb-4">{movie ? "Edit Movie" : "Add New Movie"}</h2>
			<div className="flex flex-row gap-40">
				<div className="w-[40%]">
					<div className="mb-4">
						<label className=" text-sm font-semibold text-gray-600">Title</label>
						<input
							type="text"
							name="title"
							value={formData.title}
							onChange={handleInputChange}
							className="w-full p-2 border rounded-md"
						/>
					</div>

					<div className="mb-4">
						<label className=" text-sm font-semibold text-gray-600">Duration</label>
						<input
							type="text"
							name="duration"
							value={formData.duration}
							onChange={handleInputChange}
							className="w-full p-2 border rounded-md"
						/>
					</div>

					<div className="mb-4">
						<label className=" text-sm font-semibold text-gray-600">Description</label>
						<textarea
							name="description"
							value={formData.description}
							onChange={handleDescriptionChange}
							className="w-full p-2 border rounded-md"
						/>
					</div>
				</div>
				<div className="mb-4 flex flex-col w-[50%] h-[100%]">
					<div className="text-lg font-bold text-gray-600 underline self-start">Screening Dates:</div>
					<div className="flex flex-wrap gap-6 justify-self-end self-end">
						{screeningDates.map((screening: { date: Date; id: string }, index: number) => (
							<div key={screening.id} className="flex flex-col items-center gap-1">
								<div
									className="font-bold cursor-pointer"
									onClick={() => onDeleteScreening(screening.id, screening.date)}
								>
									X
								</div>
								<div key={index} className="cursor-pointer bg-gray-200 rounded-md p-2 ">
									{screening.date.toLocaleString("he-IL", {
										day: "2-digit",
										month: "2-digit",
										hour: "2-digit",
										minute: "2-digit",
									})}
								</div>
							</div>
						))}
					</div>
					<div className="flex flex-col justify-center gap-2 items-center mt-48">
						<div className="flex flex-row ">
							<DatePicker
								className="border-solid border-2 border-black text-center "
								selected={startDate}
								onChange={(date: Date) => setStartDate(date)}
								showTimeSelect
								timeFormat="p"
								timeIntervals={15}
								dateFormat="dd-MM-yyyy HH:mm"
							/>
						</div>
						<div
							onClick={() => onAddDate()}
							className="flex items-center justify-center p-2 rounded-md text-white bg-[#1D5D90] cursor-pointer h-8"
						>
							<p>Add Screening Date</p>
						</div>
						<p>identical screening dates won't be saved into the server</p>
					</div>
				</div>
			</div>
			<button
				onClick={handleSubmitMovie}
				className="bg-blue-500 text-white py-2 px-4 rounded-md absolute bottom-5"
			>
				{movie ? "Update Movie" : "Add Movie"}
			</button>
		</div>
	);
};

export default MovieForm;
