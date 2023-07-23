import { Button, message } from "antd";

import { CategoryForm } from "../CategoryForm/CategoryForm";

import { useModal } from "shared/hook/useModal";
import { createCategory } from "modules/category/services/categoryServices";
import { useCategoryStore } from "modules/category/model/useCategory";

export const CreateCategory = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { setIsDataUpdated } = useCategoryStore();

	const onCreate = async (category: any) => {
		const formData = new FormData();

		formData.append("name", category.name);
		formData.append("photoUrl", category.photoUrl[0].originFileObj);

		try {
			await createCategory(formData);
			message.success("The category was successfully added");
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
				Add new category
			</Button>

			<CategoryForm
				open={isModalOpen}
				title="Create new Category"
				onCreate={onCreate}
				onCancel={closeModal}
			/>
		</>
	);
};
