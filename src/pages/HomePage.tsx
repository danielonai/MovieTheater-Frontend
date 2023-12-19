// components/Home.tsx
import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Movie } from "../types/Movie";
import {  useNavigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";
import { User } from "../types/User";
import { useGetMovies } from "../hooks/useGetMovies";
import { Screening } from "../types/Screening";

const Home: React.FC = () => {
	const { data } = useGetMovies();
	const [movies, setMovies] = useState<Movie[] | null>(null);
	const [startDate, setStartDate] = useState<Date | null>(new Date());
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [isFilter, setIsFilter] = useState<boolean>(false);

	useEffect(() => {
		if (data) setMovies(data!.movies.filter(m => m.screenings.length > 0));
	}, [data]);

	const navigate = useNavigate();
	const user: User | null = useGetUser();

	const onOrder = () => {
		let orderedMovies =
			movies &&
			[...movies].sort((a: Movie, b: Movie) => {
				let orderedA = a.screenings.sort((a: Screening, b: Screening) => {
					return new Date(a?.date).getTime() - new Date(b?.date).getTime();
				});
	
				let orderedB = b.screenings.sort((a: Screening, b: Screening) => {
					return new Date(a?.date).getTime() - new Date(b?.date).getTime();
				});
	
				return new Date(orderedA[0]?.date).getTime() - new Date(orderedB[0]?.date).getTime();
			});
	
		setMovies(orderedMovies);
	};
	

	const onFilter = (dates: [Date | null, Date | null]) => {
		let [start, end] = dates;
		setStartDate(start);
		setEndDate(end);
		const filteredMovies = [...data!.movies].filter((m: any) => {
			const datesArray = m.screenings.map((s: Screening) => new Date(s.date).getTime());
			if (!end) {
				const maxDate = Math.max(...datesArray);
				return maxDate >= start!.getTime();
			} else {
				for (let i = 0; i < datesArray.length; i++) {
					if (datesArray[i] >= start!.getTime() && datesArray[i] <= end!.getTime()) return true;
				}
				return false;
			}
		});
		setMovies(filteredMovies);
	};

	const restartFilter = () => {
		setStartDate(null);
		setEndDate(null);
		setMovies(data!.movies);
		setIsFilter(false);
	};

	return movies ? (
		<div className="container mx-auto mt-2">
			{user && user.user.role === "ADMIN" && (
				<div
					className="w-30 p-3 h-10 rounded flex items-center justify-center cursor-pointer bg-blue-500 hover:bg-blue-700 absolute top-40 left-20"
					onClick={() => navigate("/admin")}
				>
					Admin Page
				</div>
			)}
			<div className="flex flex-col gap-2">
				<h1 className="text-2xl font-bold text-left underline ">Available Movies:</h1>
				{!user && <p>You have to login in order to book a ticket</p>}
				<div className="flex flex-row gap-2 mb-4">
					<div
						onClick={() => onOrder()}
						className="flex items-center justify-center p-2 rounded-md bg-slate-500 cursor-pointer h-8"
					>
						<p>Order by upcoming shows</p>
					</div>
					<div className="flex flex-col gap-2 items-center">
						<div
							onClick={() => setIsFilter((prev) => !prev)}
							className="flex items-center justify-center self-start p-2 rounded-md bg-slate-500 cursor-pointer h-8"
						>
							<p>Filter by date</p>
						</div>
						{isFilter && (
							<div className="flex flex-row ">
								<DatePicker
									onChange={onFilter}
									startDate={startDate}
									endDate={endDate}
									selectsRange
									inline
								/>
								<p
									onClick={() => restartFilter()}
									className="self-end mr-auto ml-3 text-sky-500 underline cursor-pointer"
								>
									Show all movies
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
			<div className="flex flex-wrap items-center justify-center w-full gap-8">
				{movies?.map((movie, index) => (
					<MovieCard key={index} movie={movie} />
				))}
			</div>
		</div>
	) : (
		<div></div>
	);
};

export default Home;
