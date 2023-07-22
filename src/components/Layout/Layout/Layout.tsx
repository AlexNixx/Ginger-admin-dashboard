import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

export const _Layout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout.Content>
				<Header />
				<Outlet />
			</Layout.Content>
		</Layout>
	);
};
