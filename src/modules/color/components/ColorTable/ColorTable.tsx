import { useEffect } from "react";

import { Space, Table } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Color } from "../../model/ColorTypes";

import { EditColor } from "../EditColor/EditColor";
import { DeleteColor } from "../DeleteColor/DeleteColor";
import { useColorStore } from "modules/color/model/useColor";

export const ColorTable = () => {
	const colorStore = useColorStore();

	useEffect(() => {
		colorStore.getColors();
	}, [colorStore.currentPage, colorStore.isDataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		colorStore.setCurrentPage(+page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} colors`;

	const columns: ColumnsType<Color> = [
		{
			title: "Title",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Color",
			dataIndex: "rgb",
			key: "rgb",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 120,
			render: (_, { _id }) => (
				<Space>
					<EditColor colorId={_id} />
					<DeleteColor colorId={_id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={colorStore.colorsList}
			bordered
			loading={colorStore.isLoading}
			pagination={{
				current: colorStore.currentPage,
				onChange: handleTableChange,
				total: colorStore.totalColors,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
