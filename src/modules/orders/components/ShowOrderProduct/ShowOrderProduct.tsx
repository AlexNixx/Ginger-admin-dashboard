import {
	Button,
	Card,
	Col,
	Image,
	Modal,
	Row,
	Space,
	Tooltip,
	Typography,
} from "antd";
import { FC } from "react";
import { useModal } from "shared/hook/useModal";

import { LaptopOutlined } from "@ant-design/icons";
import { OrderItem } from "modules/orders/model/OrderTypes";

interface ShowOrderProductProps {
	orderItems: OrderItem[];
}

export const ShowOrderProduct: FC<ShowOrderProductProps> = ({ orderItems }) => {
	const { isModalOpen, openModal, closeModal } = useModal();

	const handleShowProduct = () => {
		openModal();
	};

	return (
		<>
			<Tooltip title="Products List">
				<Button type="primary" onClick={handleShowProduct}>
					<LaptopOutlined />
				</Button>
			</Tooltip>

			<Modal
				open={isModalOpen}
				title="Order Products"
				onCancel={closeModal}
				footer={null}
			>
				<Row gutter={[8, 16]}>
					{orderItems.map((product) => (
						<Col span={24} key={product._id}>
							<Card>
								<Space size={24}>
									<Image
										src={`${process.env.REACT_APP_SERVER_ENDPOINT}/${product.image}`}
										preview={false}
										alt="product"
										width={100}
										height={100}
										style={{ objectFit: "contain" }}
									/>
									<Space direction="vertical" size={8}>
										<Typography.Text>{product.title}</Typography.Text>
										<Typography.Text>${product.price}</Typography.Text>
										<Typography.Text>Qty: {product.qty}</Typography.Text>
									</Space>
								</Space>
							</Card>
						</Col>
					))}
				</Row>
			</Modal>
		</>
	);
};
