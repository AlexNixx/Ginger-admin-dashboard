import { FC } from "react";

import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useBrandStore } from "modules/brand/model/useBrand";
import { deleteBrand } from "modules/brand/services/brandServices";

interface DeleteBrandProps {
	brandId: string;
}

export const DeleteBrand: FC<DeleteBrandProps> = ({ brandId }) => {
	const { setIsDataUpdated } = useBrandStore();

	const handleDeleteCategory = async () => {
		try {
			await deleteBrand(brandId);
			message.success("The brand was successfully removed");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Delete the brand"
			description="Are you sure to delete this brand?"
			onConfirm={handleDeleteCategory}
			okText="Yes"
			cancelText="No"
		>
			<Button type="primary" danger>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};
