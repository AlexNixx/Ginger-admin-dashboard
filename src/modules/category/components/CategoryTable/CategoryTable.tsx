import { useEffect } from "react";

import { Image, Space, Table } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Category } from "modules/product/model/ProductTypes";
import { useCategoryStore } from "modules/category/model/useCategory";

import { EditCategory } from "../EditCategory/EditCategory";
import { DeleteCategory } from "../DeleteCategory/DeleteCategory";

export const CategoryTable = () => {
	const categoryStore = useCategoryStore();

	useEffect(() => {
		categoryStore.getCategories();
	}, [categoryStore.currentPage, categoryStore.isDataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		categoryStore.setCurrentPage(+page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} categories`;

	const columns: ColumnsType<Category> = [
		{
			title: "Photo",
			dataIndex: "photoUrl",
			key: "photoUrl",
			width: 100,
			render: (image) => (
				<Image
					src={`${process.env.REACT_APP_SERVER_ENDPOINT}/${image}`}
					preview={false}
					alt="product"
					width={100}
					height={100}
					style={{ objectFit: "contain" }}
				/>
			),
		},
		{
			title: "Title",
			dataIndex: "name",
			key: "name",
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 120,
			render: (_, { _id }) => (
				<Space>
					<EditCategory categoryId={_id} />
					<DeleteCategory categoryId={_id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={categoryStore.categoryList}
			bordered
			loading={categoryStore.isLoading}
			pagination={{
				current: categoryStore.currentPage,
				onChange: handleTableChange,
				total: categoryStore.totalCategories,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
