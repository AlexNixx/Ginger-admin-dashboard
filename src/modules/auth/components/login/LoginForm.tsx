import { FC } from "react";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";

import { useTranslation } from "react-i18next";

export type LoginFormValues = {
	email: string;
	password: string;
};

interface LoginFormProps {
	onFinish: (loginData: LoginFormValues) => void;
}

export const LoginForm: FC<LoginFormProps> = ({ onFinish }) => {
	const { t } = useTranslation("login");

	return (
		<Form
			name="basic"
			initialValues={{ remember: true }}
			onFinish={onFinish}
			autoComplete="off"
		>
			<Form.Item
				name="email"
				rules={[
					{
						required: true,
						message: `${t("required.email")}`,
						type: "email",
					},
				]}
			>
				<Input prefix={<UserOutlined />} placeholder={t("email")} />
			</Form.Item>

			<Form.Item
				name="password"
				rules={[{ required: true, message: `${t("required.password")}` }]}
			>
				<Input.Password prefix={<LockOutlined />} placeholder={t("password")} />
			</Form.Item>

			<Form.Item name="remember" valuePropName="checked">
				<Checkbox>{t("remember")}</Checkbox>
			</Form.Item>

			<Form.Item>
				<Button type="primary" htmlType="submit">
					{t("login")}
				</Button>
			</Form.Item>
		</Form>
	);
};
