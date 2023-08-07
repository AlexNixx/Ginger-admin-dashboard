import { useEffect } from "react";

import { Space, Table, Tooltip, Typography } from "antd";
import type { PaginationProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import { SearchOutlined } from "@ant-design/icons";

import type { Order } from "modules/orders/model/OrderTypes";
import { useOrderStore } from "modules/orders/model/useOrder";

import { ShowOrderProduct } from "../ShowOrderProduct/ShowOrderProduct";
import { DeliveredIcon, OnTheWayIcon, PaidIcon, WaitingIcon } from "./Icon";
import { UpdateOrderToDelivered } from "../UpdateOrderToDelivered/UpdateOrderToDelivered";
import { DeleteOrder } from "../DeleteOrder/DeleteOrder";
import { FilterByCreatedAt } from "./FilterByCreatedAt";
import { SearchById } from "./SearchById";
import { SearchByEmail } from "./SearchByEmail";

export const OrdersTable = () => {
	const orderStore = useOrderStore();

	useEffect(() => {
		orderStore.getOrders();
	}, [orderStore.currentPage, orderStore.isDataUpdated]);

	const handleTableChange: PaginationProps["onChange"] = (page) => {
		orderStore.setCurrentPage(+page);
	};

	const showTotal: PaginationProps["showTotal"] = (total) =>
		`Total ${total} orders`;

	const columns: ColumnsType<Order> = [
		{
			title: "Order Date",
			dataIndex: "createdAt",
			key: "createdAt",
			width: 120,
			render: (data) => <span>{new Date(data).toLocaleString("en-US")}</span>,
			filterDropdown: () => {
				return <FilterByCreatedAt />;
			},
		},
		{
			title: "Order id",
			dataIndex: "_id",
			key: "_id",
			width: 200,
			render: (id) => <Typography.Text copyable={id}>{id}</Typography.Text>,
			filterDropdown: () => {
				return <SearchById />;
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
		},
		{
			title: "Customer email",
			dataIndex: ["customerData", "email"],
			width: 200,
			key: "email",
			filterDropdown: () => {
				return <SearchByEmail />;
			},
			filterIcon: () => {
				return <SearchOutlined />;
			},
		},

		{
			title: "Total",
			dataIndex: "totalPrice",
			key: "totalPrice",
			width: 120,
			render: (text) => <span>${text}</span>,
		},
		{
			title: "Is paid",
			dataIndex: "isPaid",
			key: "isPaid",
			width: 100,
			render: (isPaid) => (
				<span>{isPaid ? <PaidIcon /> : <WaitingIcon />}</span>
			),
		},
		{
			title: "Payment Method",
			dataIndex: "paymentMethod",
			key: "paymentMethod",
			width: 100,
		},
		{
			title: "In Delivery",
			dataIndex: "inDelivery",
			key: "inDelivery",
			width: 100,
			render: (inDelivery) => <span>{inDelivery && <OnTheWayIcon />}</span>,
		},
		{
			title: "Is Delivered",
			dataIndex: "isDelivered",
			key: "isDelivered",
			width: 100,
			render: (isDelivered) => <span>{isDelivered && <DeliveredIcon />}</span>,
		},
		{
			title: "When Delivered",
			dataIndex: "deliveredAt",
			key: "deliveredAt",
			width: 100,
			render: (data) => (
				<span>{data && new Date(data).toLocaleString("en-US")}</span>
			),
		},
		{
			title: "Action",
			dataIndex: "action",
			key: "action",
			width: 120,
			render: (_, { _id, orderItems, isDelivered, isPaid }) => (
				<Space direction="vertical">
					<ShowOrderProduct orderItems={orderItems} />
					<UpdateOrderToDelivered
						orderId={_id}
						isDelivered={isDelivered}
						isPaid={isPaid}
					/>
					<DeleteOrder orderId={_id} />
				</Space>
			),
		},
	];

	return (
		<Table
			columns={columns}
			dataSource={orderStore.ordersList}
			bordered
			loading={orderStore.isLoading}
			pagination={{
				current: orderStore.currentPage,
				onChange: handleTableChange,
				total: orderStore.totalOrders,
				showTotal,
				position: ["topRight"],
			}}
		/>
	);
};
