import { FC } from "react";

import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useProductStore } from "modules/product/model/useProduct";

import { deleteProduct } from "modules/product/services/productServices";

interface DeleteProductProps {
	productId: string;
}

export const DeleteProduct: FC<DeleteProductProps> = ({ productId }) => {
	const { setIsDataUpdated } = useProductStore();

	const handleDeleteProduct = async () => {
		try {
			await deleteProduct(productId);
			message.success("The item was successfully removed");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Delete the product"
			description="Are you sure to delete this product?"
			onConfirm={handleDeleteProduct}
			okText="Yes"
			cancelText="No"
		>
			<Button type="primary" danger>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};
