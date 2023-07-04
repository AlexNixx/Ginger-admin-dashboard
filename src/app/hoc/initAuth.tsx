import { FC, PropsWithChildren, useEffect } from "react";
import { useAuthStore } from "modules/auth/models/useAuth";
import { Loader } from "shared/ui/fullscreen-loader";

export const InitAuth: FC<PropsWithChildren> = ({ children }) => {
	const refresh = useAuthStore((store) => store.refresh);

	useEffect(() => {
		const init = async () => {
			await refresh();
		};
		init();
	}, []);

	return <>{children}</>;
};
