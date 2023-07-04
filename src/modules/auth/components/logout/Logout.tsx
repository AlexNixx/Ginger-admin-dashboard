import { RollbackOutlined } from "@ant-design/icons";
import { FC } from "react";

import { Typography } from "antd";
import { useAuthStore } from "modules/auth/models/useAuth";

interface LogoutProps {
	short?: boolean;
	className?: string;
}

export const Logout: FC<LogoutProps> = ({ short, className }) => {
	const logout = useAuthStore((state) => state.logout);

	const handleLogout = async () => {
		const result = await logout();
		console.log(result);
	};

	return (
		<Typography.Link className={className} onClick={handleLogout}>
			<RollbackOutlined style={{ color: "white" }} />
			{!short && <p>Logout</p>}
		</Typography.Link>
	);
};
