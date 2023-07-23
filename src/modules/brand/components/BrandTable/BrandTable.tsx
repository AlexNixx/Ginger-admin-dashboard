import { useEffect } from "react";

import { Image, Space, Table } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import type { Brand } from "modules/brand/model/BrandTypes";

import { useBrandStore } from "modules/brand/model/useBrand";

import { EditBrand } from "../EditCategory/EditBrand";
import { DeleteBrand } from "../DeleteBrand/DeleteBrand";

export const BrandTable = () => {
	const brandStore = useBrandStore();

	useEffect(() => {
		brandStore.getBrands();
	}, [brandStore.currentPage, brandStore.isDataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		brandStore.setCurrentPage(+page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} brands`;

	const columns: ColumnsType<Brand> = [
		{
			title: "Photo",
			dataIndex: "photoUrl",
			key: "photoUrl",
			width: 100,
			render: (image) => (
				<Image
					src={`${process.env.REACT_APP_SERVER_ENDPOINT}/${image}`}
					preview={false}
					alt="brand"
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
					<EditBrand brandId={_id} />
					<DeleteBrand brandId={_id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={brandStore.brandList}
			bordered
			loading={brandStore.isLoading}
			pagination={{
				current: brandStore.currentPage,
				onChange: handleTableChange,
				total: brandStore.totalBrands,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
