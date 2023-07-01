import { useAuthStore } from "modules/auth/models/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const GuardRoute = () => {
	const user = useAuthStore((state) => state.user);

	if (user?.role === "ADMIN") return <Outlet />;

	return <Navigate to={"/login"} />;
};
