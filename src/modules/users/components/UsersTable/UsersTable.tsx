import { useEffect } from "react";

import { Space, Table } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { User } from "../../model/UsersTypes";
import { useUsersStore } from "modules/users/model/useUsers";
import { DeleteUser } from "../DeleteUser/DeleteUser";
import { UpdateUserRole } from "../UpdateUserRole/UpdateUserRole";
import { SearchByEmail } from "./SearchByEmail";

import { SearchOutlined } from "@ant-design/icons";

export const UsersTable = () => {
	const usersStore = useUsersStore();

	useEffect(() => {
		usersStore.getUsers();
		console.log(usersStore.usersList);
	}, [usersStore.currentPage, usersStore.isDataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		usersStore.setCurrentPage(+page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} users`;

	const columns: ColumnsType<User> = [
		{
			title: "Name",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Surname",
			dataIndex: "surname",
			key: "surname",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
			filterDropdown: () => {
				return <SearchByEmail />;
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
		},
		{
			title: "City",
			dataIndex: ["address", "city"],
			key: "city",
		},
		{
			title: "Address",
			dataIndex: ["address", "address"],
			key: "address",
		},
		{
			title: "Postal Code",
			dataIndex: ["address", "postalCode"],
			key: "postalCode",
		},
		{
			title: "Country",
			dataIndex: ["address", "country"],
			key: "country",
		},
		{
			title: "Role",
			dataIndex: "role",
			key: "role",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 50,
			render: (_, { id, role }) => (
				<Space>
					<UpdateUserRole userId={id} role={role} />
					<DeleteUser userId={id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={usersStore.usersList}
			bordered
			loading={usersStore.isLoading}
			pagination={{
				current: usersStore.currentPage,
				onChange: handleTableChange,
				total: usersStore.totalUsers,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
