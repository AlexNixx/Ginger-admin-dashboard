import { Button, message } from "antd";
import { ProductForm } from "../ProductForm/ProductForm";
import { createProduct } from "modules/product/services/productServices";

import { useModal } from "shared/hook/useModal";
import { useProductStore } from "modules/product/model/useProduct";

export const CreateProduct = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { setIsDataUpdated } = useProductStore();

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

		try {
			await createProduct(formData);
			message.success("The product was successfully added");
		} catch (error) {
			console.log(error);
		}

		setIsDataUpdated();
		closeModal();
	};

	return (
		<>
			<Button
				type="dashed"
				size={"large"}
				style={{ width: "100%", borderRadius: "0 0 5px 5px" }}
				onClick={openModal}
			>
				Add new product
			</Button>

			<ProductForm
				open={isModalOpen}
				title="Create new Product"
				onCreate={onCreate}
				onCancel={closeModal}
			/>
		</>
	);
};
