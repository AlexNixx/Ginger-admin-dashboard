import { useAuthStore } from "modules/auth/models/useAuth";
import { useEffect } from "react";

import { Navigate, Outlet } from "react-router-dom";

export const GuardRoute = () => {
	const { user, isSuccess } = useAuthStore();

	if (isSuccess && user?.role === "ADMIN") {
		return <Outlet />;
	}

	return <Navigate to={"/login"} />;
};
