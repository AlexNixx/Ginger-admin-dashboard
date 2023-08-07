import { Button, Popconfirm, message } from "antd";
import { useOrderStore } from "modules/orders/model/useOrder";
import { FC } from "react";

import { EditOutlined } from "@ant-design/icons";
import { updateToDelivered } from "modules/orders/services/orderServices";

interface UpdateOrderToDeliveredProps {
	orderId: string;
	isDelivered: boolean;
	isPaid: boolean;
}

export const UpdateOrderToDelivered: FC<UpdateOrderToDeliveredProps> = ({
	orderId,
	isDelivered,
	isPaid,
}) => {
	const { setIsDataUpdated } = useOrderStore();

	const hadleUpdateOrder = async () => {
		try {
			const res = await updateToDelivered(orderId);
			console.log(res.data);
			message.success("The order was successfully marked as delivered");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Update order status"
			description="Are you sure you want to mark this order as delivered?"
			onConfirm={hadleUpdateOrder}
			okText="Yes"
			cancelText="No"
			disabled={isDelivered || !isPaid}
		>
			<Button type="primary" disabled={isDelivered || !isPaid}>
				<EditOutlined />
			</Button>
		</Popconfirm>
	);
};
