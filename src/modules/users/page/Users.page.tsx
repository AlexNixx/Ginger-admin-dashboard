import { Col, Row } from "antd";
import { UsersTable } from "../components/UsersTable/UsersTable";

const UsersPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<UsersTable />
			</Col>
		</Row>
	);
};

export default UsersPage;
