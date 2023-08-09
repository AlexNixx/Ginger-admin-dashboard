import { FC } from "react";

import { Button, Popconfirm, Tooltip, message } from "antd";
import { UserDeleteOutlined } from "@ant-design/icons";

import { useUsersStore } from "modules/users/model/useUsers";
import { deleteUser } from "modules/users/services/usersServices";

interface DeleteUserProps {
	userId: string;
}

export const DeleteUser: FC<DeleteUserProps> = ({ userId }) => {
	const { setIsDataUpdated } = useUsersStore();

	const handleDeleteUser = async () => {
		try {
			await deleteUser(userId);
			message.success("The user was successfully removed");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Tooltip title="Delete the user">
			<Popconfirm
				title="Delete the user"
				description="Are you sure to delete this user?"
				onConfirm={handleDeleteUser}
				okText="Yes"
				cancelText="No"
			>
				<Button type="primary" danger>
					<UserDeleteOutlined />
				</Button>
			</Popconfirm>
		</Tooltip>
	);
};
