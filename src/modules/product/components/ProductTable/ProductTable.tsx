import { Checkbox, Col, Image, Input, Row, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { getAllProduct } from "modules/product/services/productServices";
import { ChangeEvent, useEffect, useState } from "react";
import { DeleteProduct } from "../DeleteProduct/DeleteProduct";
import { Product } from "modules/product/model/ProductTypes";
import { EditProduct } from "../EditProduct/EditProduct";

import { SearchOutlined } from "@ant-design/icons";

import type { PaginationProps } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";

export const ProductTable = () => {
	const [products, setProducts] = useState<Product[]>([]);
	const [dataUpdated, setDataUpdated] = useState<boolean>(false);

	const [currentPage, setCurrentPage] = useState<number>(1);
	const [totalPage, setTotalPage] = useState<number>(1);

	const [brandsFilter, setBrandsFilter] = useState<string[]>([]);
	const [categoriesFilter, setCategoriesFilter] = useState<string[]>([]);
	const [searchName, setSearchName] = useState<string>("");

	const PRODUCTS_LIMIT = 7;

	const convertToURLFormat = (filters: any[]) => {
		return filters?.join(","); // Use "%2C" to represent the comma (",") in the URL
	};

	const getProduct = async () => {
		const response = await getAllProduct({
			limit: PRODUCTS_LIMIT,
			page: currentPage,
			brands: convertToURLFormat(brandsFilter),
			categories: convertToURLFormat(categoriesFilter),
			slug: searchName,
		});
		setProducts(
			response.data.products.map((product) => ({
				...product,
				key: product._id,
			}))
		);

		setCurrentPage(response.data.currentPage);
		setTotalPage(response.data.totalPages);
		setDataUpdated(false);
	};

	useEffect(() => {
		getProduct();
	}, [currentPage, brandsFilter, categoriesFilter, dataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		setCurrentPage(page);
	};

	const handleSetSearchName = (e: ChangeEvent<HTMLInputElement>) => {
		setSearchName(e.target.value);
		setCurrentPage(1);
	};

	const handleSetBrandFilter = (checkedValues: CheckboxValueType[]) => {
		setBrandsFilter(checkedValues as string[]);
		setCurrentPage(1);
	};

	const handleSetCategoriesFilter = (checkedValues: CheckboxValueType[]) => {
		setCategoriesFilter(checkedValues as string[]);
		setCurrentPage(1);
	};

	const brandFilters = [
		{
			label: "Apple",
			value: "640131468a62a6e9894db1ef",
		},
		{
			label: "Samsung",
			value: "640131578a62a6e9894db1f1",
		},
	];

	const categoriesFilters = [
		{
			label: "Phone",
			value: "64012f858a62a6e9894db1e1",
		},
		{
			label: "Laptop",
			value: "64012fa78a62a6e9894db1e3",
		},
	];

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
				return (
					<Row>
						<Col style={{ padding: "1rem", minWidth: "20rem" }}>
							<Input
								placeholder="Search by name"
								onChange={handleSetSearchName}
							/>
						</Col>
					</Row>
				);
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
				return (
					<Row>
						<Col span={4}>
							<Checkbox.Group
								options={categoriesFilters}
								onChange={handleSetCategoriesFilter}
								style={{ padding: "1rem", gap: "1rem" }}
							/>
						</Col>
					</Row>
				);
			},
		},
		{
			title: "Brand",
			dataIndex: ["brand", "name"],
			key: "brand",
			width: 120,
			filterDropdown: () => {
				return (
					<Row>
						<Col span={4}>
							<Checkbox.Group
								options={brandFilters}
								onChange={handleSetBrandFilter}
								style={{ padding: "1rem", gap: "1rem" }}
							/>
						</Col>
					</Row>
				);
			},
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
					<EditProduct productId={_id} setDataUpdated={setDataUpdated} />
					<DeleteProduct productId={_id} setDataUpdated={setDataUpdated} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={products}
			bordered
			pagination={{
				current: currentPage,
				onChange: handleTableChange,
				total: totalPage * PRODUCTS_LIMIT,
				position: ["topRight"],
			}}
		/>
	);
};
