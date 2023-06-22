import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { login } from "modules/auth/services/authServices";

export const LoginForm = () => {
	const onFinish = async (values: any) => {
		try {
			console.log("Received values of form: ", values);
			const { email, password } = values;
			const response = await login(email, password);
			console.log("Response:", response);
		} catch (error) {
			console.error("An error occurred:", error);
		}
	};

	return (
		<Form
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item
				name="email"
				rules={[{ required: true, message: "Please input your username!" }]}
			>
				<Input prefix={<UserOutlined />} placeholder="Username" />
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: "Please input your password!" }]}
			>
				<Input.Password prefix={<LockOutlined />} placeholder="Password" />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked">
				<Checkbox>Remember me</Checkbox>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					Submit
				</Button>
			</Form.Item>
		</Form>
	);
};
