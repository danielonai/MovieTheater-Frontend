import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import ProtectedRoute from "./ProtectedRoute";
import AdminPage from "../pages/AdminPage";
import AdminRoute from "./AdminRoute";
import EditPage from "../pages/EditPage";
import CreatePage from "../pages/CreatePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/order",
		element: (
			<ProtectedRoute>
				<OrderPage />
			</ProtectedRoute>
		),
	},
	{
		path: "/admin",
		element: (
			<AdminRoute>
				<AdminPage />
			</AdminRoute>
		),
	},
	{
		path: "/admin/create",
		element: (
			<AdminRoute>
				<CreatePage />
			</AdminRoute>
		),
	},
	{
		path: "/admin/edit/:movieId",
		element: (
			<AdminRoute>
				<EditPage />
			</AdminRoute>
		),
	},
]);

export default router;
