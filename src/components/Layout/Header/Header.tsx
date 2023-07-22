import { Layout, Space } from "antd";

import { LanguageSwitcher } from "modules/session";
import { Logout } from "modules/auth";

import cls from "./Header.module.scss";

export const Header = () => {
	return (
		<Layout.Header className={cls.header}>
			<LanguageSwitcher />
			<Logout />
		</Layout.Header>
	);
};
