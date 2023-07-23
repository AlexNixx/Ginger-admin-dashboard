import { useEffect } from "react";

import { Image, Space, Table } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { SearchOutlined } from "@ant-design/icons";

import { SearchByName } from "./SearchByName";
import { FilterByBrand } from "./FilterByBrand";
import { FilterByCategory } from "./FilterByCategory";

import { DeleteProduct } from "../DeleteProduct/DeleteProduct";
import { EditProduct } from "../EditProduct/EditProduct";

import { useProductStore } from "modules/product/model/useProduct";

import type { Product } from "modules/product/model/ProductTypes";

export const ProductTable = () => {
	const productStore = useProductStore();

	useEffect(() => {
		productStore.getBrands();
		productStore.getCategories();
		productStore.getColors();
	}, []);

	useEffect(() => {
		productStore.getProducts();
	}, [
		productStore.currentPage,
		productStore.categoriesFilter,
		productStore.brandsFilter,
		productStore.slugFilter,
		productStore.isDataUpdated,
	]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		productStore.setCurrentPage(page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} items`;

	const columns: ColumnsType<Product> = [
		{
			title: "Photo",
			dataIndex: "photoUrl",
			key: "photoUrl",
			width: 50,
			render: (image) => (
				<Image
					src={`${process.env.REACT_APP_SERVER_ENDPOINT}/${image}`}
					preview={false}
					alt="product"
					width={50}
					height={50}
					style={{ objectFit: "contain" }}
				/>
			),
		},
		{
			title: "Title",
			dataIndex: "title",
			key: "title",
			filterDropdown: () => {
				return <SearchByName />;
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
		},
		{
			title: "Category",
			dataIndex: ["category", "name"],
			key: "category",
			width: 120,
			filterDropdown: () => {
				return <FilterByCategory />;
			},
		},
		{
			title: "Brand",
			dataIndex: ["brand", "name"],
			key: "brand",
			width: 120,
			filterDropdown: () => {
				return <FilterByBrand />;
			},
		},
		{
			title: "Color",
			dataIndex: ["color", "name"],
			key: "color",
			width: 120,
		},
		{
			title: "Price",
			dataIndex: "price",
			key: "price",
			width: 120,
			render: (text) => <span>{text}$</span>,
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 120,
			render: (_, { _id }) => (
				<Space>
					<EditProduct productId={_id} />
					<DeleteProduct productId={_id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={productStore.productsList}
			bordered
			loading={productStore.isLoading}
			pagination={{
				current: productStore.currentPage,
				onChange: handleTableChange,
				total: productStore.totalProducts,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
