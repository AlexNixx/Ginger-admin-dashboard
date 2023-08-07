import { FC } from "react";

import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useOrderStore } from "modules/orders/model/useOrder";
import { deleteOrder } from "modules/orders/services/orderServices";

interface DeleteOrderProps {
	orderId: string;
}

export const DeleteOrder: FC<DeleteOrderProps> = ({ orderId }) => {
	const { setIsDataUpdated } = useOrderStore();

	const handleDeleteOrder = async () => {
		try {
			await deleteOrder(orderId);
			message.success("The orderd was successfully removed");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Delete the order"
			description="Are you sure to delete this order?"
			onConfirm={handleDeleteOrder}
			okText="Yes"
			cancelText="No"
		>
			<Button type="primary" danger>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};
