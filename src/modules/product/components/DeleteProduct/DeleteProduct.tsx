import { Button, Popconfirm } from "antd";
import { FC } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { deleteProduct } from "modules/product/services/productServices";

interface DeleteProductProps {
	productId: string;
	setDataUpdated: (state: boolean) => void;
}

export const DeleteProduct: FC<DeleteProductProps> = ({
	productId,
	setDataUpdated,
}) => {
	const handleDeleteProduct = async () => {
		try {
			await deleteProduct(productId);
			setDataUpdated(true);
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
