import React from "react";
import { Movie } from "../types/Movie";
import { useNavigate } from "react-router-dom";
import { useGetMovies } from "../hooks/useGetMovies";
import { useDeleteMovie } from "../hooks/useDeleteMovie";
import { queryClient } from "../lib/react-query";

const MoviesList: React.FC = () => {
	const { mutateAsync: deleteMovieMutateAsync } = useDeleteMovie();

	const { data: movies } = useGetMovies();
	const navigate = useNavigate();
	const onEdit = (movie: Movie | any) => {
		navigate(`/admin/edit/${movie.id}`,movie.id);
	};

	const ondelete = async (movie: Movie) => {
		try {
			await deleteMovieMutateAsync(movie.id, {
				onSuccess: () => {
					queryClient.invalidateQueries({ queryKey: ["movies"], refetchType: "all" });
				},
				onError: (err) => {
					console.log("🚀 ~ file: MovieForm.tsx:94 ~ onSuccess: ~ err:", err);
				},
			});
		} catch (error) {
			console.log("🚀 ~ file: MovieForm.tsx:101 ~ onSuccess: ~ error:", error);
		}
	};

	return (
		<div className="flex flex-wrap items-center justify-center w-[80%] gap-8 mt-10">
			{movies?.movies.map((movie) => (
				<div key={movie.id} className="w-50 border p-6 mb-6 flex flex-col items-center">
					<h2 className="text-xl  font-bold mb-2">{movie.title}</h2>
					<div className="flex flex-row gap-2">
						<div
							className="w-30 p-3 h-10 rounded flex items-center justify-center cursor-pointer bg-blue-400 "
							onClick={() => onEdit(movie)}
						>
							Edit
						</div>
						<div
							className="w-30 p-3 h-10 rounded flex items-center justify-center cursor-pointer bg-red-400 "
							onClick={() => ondelete(movie)}
						>
							delete
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default MoviesList;
