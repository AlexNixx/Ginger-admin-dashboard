import { Routes, Route } from "react-router";

import { Layout } from "components/Layout";
import { Test } from "pages/Test";

import { ProductPage } from "modules/product";
import { CategoryPage } from "modules/category";

import { LoginPage, GuardRoute } from "modules/auth";

export const Routing = () => {
	return (
		<Routes>
			<Route path={"/login"} element={<LoginPage />} />
			<Route element={<GuardRoute />}>
				<Route element={<Layout />}>
					<Route path={"/"} element={<Test />} />
					<Route path={"/products"} element={<ProductPage />} />
					<Route path={"/categories"} element={<CategoryPage />} />
					<Route path={"/brands"} element={<Test />} />
					<Route path={"/colors"} element={<Test />} />
					<Route path={"/users"} element={<Test />} />
					<Route path={"/orders"} element={<Test />} />
				</Route>
			</Route>
		</Routes>
	);
};
