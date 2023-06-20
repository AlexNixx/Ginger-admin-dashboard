import { Outlet } from "react-router-dom";
import { Layout } from "antd";

import { Sidebar } from "../Sidebar/Sidebar";

export const _Layout = () => {
	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar />
			<Layout.Content>
				<Outlet />
			</Layout.Content>
		</Layout>
	);
};
