import { Row, Col } from "antd";
import { LoginForm, LoginFormValues } from "./LoginForm";
import { login } from "modules/auth/services/authServices";

export const LoginAction = () => {
	const onFinish = async (loginData: LoginFormValues) => {
		try {
			const { email, password } = loginData;
			const response = await login(email, password);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
			<Col span={6}>
				<LoginForm onFinish={onFinish} />
			</Col>
		</Row>
	);
};
