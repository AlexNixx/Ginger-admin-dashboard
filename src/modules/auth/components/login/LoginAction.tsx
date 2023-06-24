import { Row, Col } from "antd";
import { LoginForm, LoginFormValues } from "./LoginForm";
import { login } from "modules/auth/services/authServices";

import { AxiosError } from "axios";

export const LoginAction = () => {
	const onFinish = async (loginData: LoginFormValues) => {
		try {
			const { email, password } = loginData;
			const response = await login(email, password);
		} catch (error) {
			const err = error as AxiosError;
			console.log(err.response?.data);
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
