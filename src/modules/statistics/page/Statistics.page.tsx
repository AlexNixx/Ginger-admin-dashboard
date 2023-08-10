import { Col, Row } from "antd";
import { OrdersStatististics } from "../components/OrdersStatististics";

const StatisticsPage = () => {
	return (
		<Row>
			<Col span={24} style={{ padding: "3rem" }}>
				<OrdersStatististics />
			</Col>
		</Row>
	);
};
export default StatisticsPage;
