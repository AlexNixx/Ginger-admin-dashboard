import { FC } from "react";

import { Button, Popconfirm, Tooltip, message } from "antd";
import { UserSwitchOutlined } from "@ant-design/icons";

import { useUsersStore } from "modules/users/model/useUsers";
import { updateUserRole } from "modules/users/services/usersServices";

interface UpdateUserRoleProps {
	userId: string;
	role: "USER" | "ADMIN";
}

export const UpdateUserRole: FC<UpdateUserRoleProps> = ({ userId, role }) => {
	const { setIsDataUpdated } = useUsersStore();

	const isAdmin = role === "ADMIN";

	const handleUpdateUserRole = async () => {
		try {
			await updateUserRole(userId);
			message.success(
				`The user has been successfully made an ${isAdmin ? "user" : "admin"}`
			);
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Tooltip title={`Make ${isAdmin ? "admin user role" : "user admin role"}`}>
			<Popconfirm
				title={`Make ${isAdmin ? "admin user role" : "user admin role"}`}
				description={`Are you sure to make this ${
					isAdmin ? "admin user role" : "user admin role"
				}?`}
				onConfirm={handleUpdateUserRole}
				okText="Yes"
				cancelText="No"
			>
				<Button type="primary">
					<UserSwitchOutlined />
				</Button>
			</Popconfirm>
		</Tooltip>
	);
};
