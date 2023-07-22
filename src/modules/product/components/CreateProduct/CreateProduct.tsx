import { Button, Modal } from "antd";
import { useState } from "react";
import { CreateProductForm, ProductFormValues } from "./CreateProductForm";
import { createProduct } from "modules/product/services/productServices";

export const CreateProduct = () => {
	const [open, setOpen] = useState<boolean>(false);

	const showModal = () => {
		setOpen(true);
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
		formData.append("photoUrl", product.photoUrl[0].originFileObj);

		console.log(product);

		const response = await createProduct(formData);
		console.log(response);

		setOpen(false);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				type="dashed"
				size={"large"}
				style={{ width: "100%" }}
				onClick={showModal}
			>
				Add new product
			</Button>

			<CreateProductForm
				open={open}
				onCreate={onCreate}
				onCancel={handleCancel}
			/>
		</>
	);
};
