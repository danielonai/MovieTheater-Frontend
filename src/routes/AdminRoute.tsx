import React from "react";
import {  Navigate } from "react-router-dom";
import { useGetUser } from "../hooks/useGetUser";

type props = {
	children: JSX.Element;
};

const AdminRoute: React.FC<props> = ({ children }) => {
	const user = useGetUser();
	return user && user.user.role === 'ADMIN' ? children : <Navigate to={"/"} state={{ status: "unauthenticated" }} />;
};

export default AdminRoute;
