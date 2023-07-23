import { FC, useState } from "react";

import { Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { CategoryForm } from "../CategoryForm/CategoryForm";

import type { Category } from "modules/category/model/CategoryTypes";

import {
	getOneCategory,
	updateCategory,
} from "modules/category/services/categoryServices";

import { useModal } from "shared/hook/useModal";
import { useCategoryStore } from "modules/category/model/useCategory";

interface EditCategoryProps {
	categoryId: string;
}

export const EditCategory: FC<EditCategoryProps> = ({ categoryId }) => {
	const { setIsDataUpdated } = useCategoryStore();
	const [category, setCategory] = useState<Category | null>();
	const { isModalOpen, openModal, closeModal } = useModal();

	const getCategoryData = async () => {
		const categoryResonse = await getOneCategory(categoryId);
		setCategory(categoryResonse.data);
	};

	const onCreate = async (category: any) => {
		const formData = new FormData();

		formData.append("name", category.name);

		if (category.photoUrl[0].originFileObj) {
			formData.append("photoUrl", category.photoUrl[0].originFileObj);
		} else {
			formData.append("photoUrl", category.photoUrl[0].url);
		}
		try {
			await updateCategory(categoryId, formData);
			message.success("The category was successfully added");
		} catch (error) {
			console.log(error);
		}

		setIsDataUpdated();
		setCategory(null);
		closeModal();
	};

	const handleEditClick = async () => {
		await getCategoryData();
		openModal();
	};

	return (
		<>
			<Button type="primary" onClick={handleEditClick}>
				<EditOutlined />
			</Button>

			<CategoryForm
				open={isModalOpen}
				title="Update Category"
				onCreate={onCreate}
				onCancel={closeModal}
				categoryValue={category}
				key={category?._id}
			/>
		</>
	);
};
