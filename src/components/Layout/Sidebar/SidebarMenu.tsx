import { Menu } from "antd";

import type { MenuProps } from "antd";
import {
	LaptopOutlined,
	AppstoreOutlined,
	FormatPainterOutlined,
	AppleOutlined,
	TeamOutlined,
	ShoppingCartOutlined,
	RollbackOutlined,
} from "@ant-design/icons";

import { Link, useLocation } from "react-router-dom";

import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "modules/session";
import { LangIcon } from "modules/session/component/language-switcher/icon";
import { Logout } from "modules/auth";

export type MenuItem = Required<MenuProps>["items"][number] & {
	label: JSX.Element;
};

export const SidebarMenu = () => {
	const location = useLocation();
	const currentPath = location.pathname;
	const { t } = useTranslation("sidebar");

	const menuItems: MenuItem[] = [
		{
			key: "1",
			icon: <LaptopOutlined />,
			label: <Link to="/products">{t("products")}</Link>,
		},
		{
			key: "2",
			icon: <AppstoreOutlined />,
			label: <Link to="/categories">{t("categories")}</Link>,
		},
		{
			key: "3",
			icon: <AppleOutlined />,
			label: <Link to="/brands">{t("brands")}</Link>,
		},
		{
			key: "4",
			icon: <FormatPainterOutlined />,
			label: <Link to="/colors">{t("colors")}</Link>,
		},
		{
			key: "5",
			icon: <ShoppingCartOutlined />,
			label: <Link to="/orders">{t("orders")}</Link>,
		},
		{
			key: "6",
			icon: <TeamOutlined />,
			label: <Link to="/users">{t("users")}</Link>,
		},
		// {
		// 	key: "7",
		// 	icon: <LangIcon />,
		// 	label: <LanguageSwitcher />,
		// },
		// {
		// 	key: "8",
		// 	icon: <RollbackOutlined />,
		// 	label: <Logout />,
		// },
	];

	const defaultSelectedKeys = menuItems.find(
		(item) => item.label.props.to === currentPath
	)?.key;

	return (
		<Menu
			theme="dark"
			defaultSelectedKeys={
				defaultSelectedKeys ? [defaultSelectedKeys.toString()] : undefined
			}
			mode="inline"
			items={menuItems}
		/>
	);
};
