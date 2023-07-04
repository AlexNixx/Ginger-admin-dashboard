import { Layout, Image } from "antd";
import { useState } from "react";

import logo from "shared/assets/image/logo.svg";
import logoCollapsed from "shared/assets/image/logo-collapsed.svg";

import cls from "./Sidebar.module.scss";

import { LanguageSwitcher } from "modules/session";
import { SidebarMenu } from "./SidebarMenu";
import { Logout } from "modules/auth";

export const Sidebar = () => {
	const [collapsed, setCollapsed] = useState<boolean>(false);

	return (
		<Layout.Sider
			collapsible
			collapsed={collapsed}
			onCollapse={(value: boolean) => setCollapsed(value)}
			theme="dark"
			className={cls.sidebar}
		>
			<Image
				src={collapsed ? logoCollapsed : logo}
				alt="logo"
				height={"3rem"}
				width={"100%"}
				className={cls.logo}
				preview={false}
			/>

			<SidebarMenu />

			<Logout short={collapsed} className={cls.logout} />
			{/* <LanguageSwitcher short={collapsed} />  */}
		</Layout.Sider>
	);
};
