import { useNavigate } from "react-router-dom";
import MovieForm from "../components/MovieForm";
import backBtn from "../assets/backBtn.png";

const CreatePage: React.FC = () => {
	const navigate = useNavigate();

	return (
		<>
			<img
				src={backBtn}
				alt={"back"}
				className=" cursor-pointer w-20 h-20 absolute top-32 left-20"
				onClick={() => navigate("/admin")}
			/>
			<MovieForm />
		</>
	);
};

export default CreatePage;
