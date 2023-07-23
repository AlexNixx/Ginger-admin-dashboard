import { Button, message } from "antd";
import { FC, useState } from "react";

import { EditOutlined } from "@ant-design/icons";
import {
	getOneProduct,
	updateProduct,
} from "modules/product/services/productServices";
import { ProductForm } from "../ProductForm/ProductForm";
import { Product } from "modules/product/model/ProductTypes";
import { useProductStore } from "modules/product/model/useProduct";
import { useModal } from "shared/hook/useModal";

interface EditProductProps {
	productId: string;
}

export const EditProduct: FC<EditProductProps> = ({ productId }) => {
	const { setIsDataUpdated } = useProductStore();
	const [product, setProduct] = useState<Product | null>();
	const { isModalOpen, openModal, closeModal } = useModal();

	const getProductData = async () => {
		const productResponse = await getOneProduct(productId);
		setProduct(productResponse.data);
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

		try {
			await updateProduct(productId, formData);
			message.success("The item has been successfully edited");
		} catch (error) {
			console.log(error);
		}

		setProduct(null);
		closeModal();
		setIsDataUpdated();
	};

	const handleEditClick = async () => {
		await getProductData();
		openModal();
	};

	return (
		<>
			<Button type="primary" onClick={handleEditClick}>
				<EditOutlined />
			</Button>

			<ProductForm
				open={isModalOpen}
				title="Update Product"
				onCreate={onCreate}
				onCancel={closeModal}
				productValue={product}
				key={product?._id}
			/>
		</>
	);
};
