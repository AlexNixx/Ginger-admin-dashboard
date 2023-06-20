import { Layout, Menu } from "antd";
import { useState } from "react";

import { MenuItem, menuItems } from "./MenuItem";

import logo from "shared/assets/image/logo.svg";
import logoCollapsed from "shared/assets/image/logo-collapsed.svg";

import cls from "./Sidebar.module.scss";
import { useLocation } from "react-router-dom";

export const Sidebar = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);
	const location = useLocation();
	const currentPath = location.pathname;

	const defaultSelectedKeys = menuItems.find(
		(item) => item.label.props.to === currentPath
	)?.key;

	return (
		<Layout.Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value: boolean) => setCollapsed(value)}
			theme="dark"
		>
			<img
				src={collapsed ? logoCollapsed : logo}
				alt="logo"
				className={cls.logo}
			/>

			<Menu
				theme="dark"
				defaultSelectedKeys={
					defaultSelectedKeys ? [defaultSelectedKeys.toString()] : undefined
				}
				mode="inline"
				items={menuItems}
			/>
		</Layout.Sider>
	);
};
