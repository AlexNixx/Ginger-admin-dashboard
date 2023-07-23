import { Button, message } from "antd";

import { BrandForm } from "../BrandForm/BrandForm";

import { useModal } from "shared/hook/useModal";
import { createBrand } from "modules/brand/services/brandServices";
import { useBrandStore } from "modules/brand/model/useBrand";

export const CreateBrand = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { setIsDataUpdated } = useBrandStore();

	const onCreate = async (category: any) => {
		const formData = new FormData();

		formData.append("name", category.name);
		formData.append("photoUrl", category.photoUrl[0].originFileObj);

		try {
			await createBrand(formData);
			message.success("The brand was successfully added");
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
				Add new brand
			</Button>

			<BrandForm
				open={isModalOpen}
				title="Create new Brand"
				onCreate={onCreate}
				onCancel={closeModal}
			/>
		</>
	);
};
