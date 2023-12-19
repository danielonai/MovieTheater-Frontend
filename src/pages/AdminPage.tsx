import React from "react";
import MoviesList from "../components/MoviesList";
import backBtn from "../assets/backBtn.png";
import { useNavigate } from "react-router-dom";

const AdminPage: React.FC = () => {

	const navigate = useNavigate();

	return (
		<div className="flex flex-col items-center justify-center ">
			<img
				src={backBtn}
				alt={"back home"}
				className=" cursor-pointer w-20 h-20 absolute top-56 left-20"
				onClick={() => navigate("/")}
			/>
			<h1 className="text-3xl font-bold mb-6">Admin Page</h1>
			<div
				className="bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded mb-100"
				onClick={()=> navigate("/admin/create")}
			>
				Add Movie
			</div>
      <MoviesList />
		</div>
	);
};

export default AdminPage;
