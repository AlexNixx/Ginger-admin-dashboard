import { RollbackOutlined } from "@ant-design/icons";
import { FC } from "react";

import { Button } from "antd";
import { useAuthStore } from "modules/auth/models/useAuth";

interface LogoutProps {
	className?: string;
}

export const Logout: FC<LogoutProps> = ({ className }) => {
	const logout = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		await logout();
	};

	return (
		<Button type="primary" className={className} onClick={handleLogout}>
			Logout
			<RollbackOutlined style={{ color: "white" }} />
		</Button>
	);
};
