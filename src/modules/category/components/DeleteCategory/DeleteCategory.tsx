import { FC } from "react";

import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useCategoryStore } from "modules/category/model/useCategory";
import { deleteCategory } from "modules/category/services/categoryServices";

interface DeleteCategoryProps {
	categoryId: string;
}

export const DeleteCategory: FC<DeleteCategoryProps> = ({ categoryId }) => {
	const categoryStore = useCategoryStore();

	const handleDeleteCategory = async () => {
		try {
			await deleteCategory(categoryId);
			message.success("The category was successfully removed");
			categoryStore.setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Delete the category"
			description="Are you sure to delete this category?"
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
