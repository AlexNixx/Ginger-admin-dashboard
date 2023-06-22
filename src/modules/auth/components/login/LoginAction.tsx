import { Row, Col } from "antd";
import { LoginForm } from "./LoginForm";

export const LoginAction = () => {
	return (
		<Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
			<Col span={6}>
				<LoginForm />
			</Col>
		</Row>
	);
};
