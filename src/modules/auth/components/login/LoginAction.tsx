import { Col, Row, Spin, Alert, Space, Image, message } from "antd";
import { LoginForm, LoginFormValues } from "./LoginForm";

import logo from "shared/assets/image/logo.svg";

import { useAuthStore } from "modules/auth/models/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Loader } from "shared/ui/fullscreen-loader";

export const LoginAction = () => {
	const { login, isSuccess, isLoading, isError, error } = useAuthStore();
	const navigate = useNavigate();

	const onFinish = async (loginData: LoginFormValues) => {
		const { email, password } = loginData;

		await login(email, password);
	};

	useEffect(() => {
		if (isError && error) {
			message.error(error);
		}
	}, [isError, error]);

	useEffect(() => {
		if (isSuccess) {
			message.success("Authorization succeeded");
			navigate("/");
		}
	}, [isSuccess]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
			<Col span={6}>
				<Image
					src={logo}
					alt="logo"
					height={"3rem"}
					width={"100%"}
					preview={false}
					style={{ marginBottom: "8rem" }}
				/>
				<LoginForm onFinish={onFinish} />
			</Col>
		</Row>
	);
};
