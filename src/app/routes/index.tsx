import { Routes, Route } from "react-router";

import { Layout } from "components/Layout";
import { Test } from "pages/Test";

import { ProductPage } from "modules/product";
import { CategoryPage } from "modules/category";
import { BrandPage } from "modules/brand";

import { LoginPage, GuardRoute } from "modules/auth";
import { ColorPage } from "modules/color";
import { OrderPage } from "modules/orders";

export const Routing = () => {
	return (
		<Routes>
			<Route path={"/login"} element={<LoginPage />} />
			<Route element={<GuardRoute />}>
				<Route element={<Layout />}>
					<Route path={"/"} element={<Test />} />
					<Route path={"/products"} element={<ProductPage />} />
					<Route path={"/categories"} element={<CategoryPage />} />
					<Route path={"/brands"} element={<BrandPage />} />
					<Route path={"/colors"} element={<ColorPage />} />
					<Route path={"/orders"} element={<OrderPage />} />
					<Route path={"/users"} element={<Test />} />
				</Route>
			</Route>
		</Routes>
	);
};
