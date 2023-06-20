import type { MenuProps } from "antd";
import {
	LaptopOutlined,
	AppstoreOutlined,
	FormatPainterOutlined,
	AppleOutlined,
	TeamOutlined,
	ShoppingCartOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

// export type MenuItem = Required<MenuProps>["items"][number];
export type MenuItem = Required<MenuProps>["items"][number] & {
	label: JSX.Element;
};

export const menuItems: MenuItem[] = [
	{
		key: "1",
		icon: <LaptopOutlined />,
		label: <Link to="/products">Products</Link>,
	},
	{
		key: "2",
		icon: <AppstoreOutlined />,
		label: <Link to="/categories">Categories</Link>,
	},
	{
		key: "3",
		icon: <AppleOutlined />,
		label: <Link to="/brands">Brands</Link>,
	},
	{
		key: "4",
		icon: <FormatPainterOutlined />,
		label: <Link to="/colors">Colors</Link>,
	},
	{
		key: "5",
		icon: <ShoppingCartOutlined />,
		label: <Link to="/orders">Orders</Link>,
	},
	{
		key: "6",
		icon: <TeamOutlined />,
		label: <Link to="/users">Users</Link>,
	},
];
