import React from "react";
import {  Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";

type props = {
	children: JSX.Element;
};

const ProtectedRoute: React.FC<props> = ({ children }) => {
	const user = useGetUser();
	return user ? children : <Navigate to={"/"} state={{ status: "unauthenticated" }} />;
};

export default ProtectedRoute;
