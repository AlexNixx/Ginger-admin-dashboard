import { Col, Row } from "antd";
import { OrdersTable } from "../components/OrdersTable/OrdersTable";

const OrderPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<OrdersTable />
			</Col>
		</Row>
	);
};

export default OrderPage;
