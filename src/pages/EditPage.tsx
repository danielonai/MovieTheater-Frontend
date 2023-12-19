import { useNavigate, useParams } from "react-router-dom";
import { useGetMovie } from "../hooks/useGetMovie";
import MovieForm from "../components/MovieForm";
import backBtn from "../assets/backBtn.png";

const EditPage: React.FC = () => {
	const { movieId } = useParams();
	const { data }: any = useGetMovie(movieId ?? "");

	const navigate = useNavigate();

	return data ? ( 
		<>
			<img
				src={backBtn}
				alt={"back"}
				className=" cursor-pointer w-20 h-20 absolute top-32 left-20"
				onClick={() => navigate("/admin")}
			/>
			<MovieForm movie={data.movie} />
		</>
	): <div></div>
};

export default EditPage;
