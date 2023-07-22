import { Button } from "antd";
import { FC, useEffect, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import {
	getOneProduct,
	updateProduct,
} from "modules/product/services/productServices";
import { CreateProductForm } from "../CreateProduct/CreateProductForm";
import { Product } from "modules/product/model/ProductTypes";

interface EditProductProps {
	productId: string;
	setDataUpdated: (state: boolean) => void;
}

export const EditProduct: FC<EditProductProps> = ({
	productId,
	setDataUpdated,
}) => {
	const [product, setProduct] = useState<Product>();
	const [open, setOpen] = useState<boolean>(false);

	const getProductData = async () => {
		const productResonse = await getOneProduct(productId);
		setOpen(true);
		setProduct(productResonse.data);
	};

	const onCreate = async (product: any) => {
		const formData = new FormData();

		formData.append("title", product.title);
		formData.append("price", product.price);
		formData.append("category", product.category);
		formData.append("brand", product.brand);
		formData.append("color", product.color);
		formData.append("isStock", product.inStoke);
		formData.append("deviceInfo", JSON.stringify(product.deviceInfo));

		if (product.photoUrl[0].originFileObj) {
			formData.append("photoUrl", product.photoUrl[0].originFileObj);
		} else {
			formData.append("photoUrl", product.photoUrl[0].url);
		}

		await updateProduct(productId, formData);

		setDataUpdated(true);
		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleEditProduct = () => {
		getProductData();
	};

	return (
		<>
			<Button type="primary" onClick={handleEditProduct}>
				<EditOutlined />
			</Button>

			<CreateProductForm
				open={open}
				onCreate={onCreate}
				onCancel={handleCancel}
				productValue={product}
			/>
		</>
	);
};
