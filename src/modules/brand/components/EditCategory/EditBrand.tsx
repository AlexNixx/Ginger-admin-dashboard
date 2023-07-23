import { FC, useState } from "react";

import { Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { BrandForm } from "../BrandForm/BrandForm";

import type { Brand } from "modules/brand/model/BrandTypes";

import { getOneBrand, updateBrand } from "modules/brand/services/brandServices";

import { useModal } from "shared/hook/useModal";
import { useBrandStore } from "modules/brand/model/useBrand";

interface EditBrandProps {
	brandId: string;
}

export const EditBrand: FC<EditBrandProps> = ({ brandId }) => {
	const { setIsDataUpdated } = useBrandStore();
	const [brand, setBrand] = useState<Brand | null>();
	const { isModalOpen, openModal, closeModal } = useModal();

	const getBrandData = async () => {
		const brandResponse = await getOneBrand(brandId);
		setBrand(brandResponse.data);
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
			await updateBrand(brandId, formData);
			message.success("The brand was successfully added");
		} catch (error) {
			console.log(error);
		}

		setIsDataUpdated();
		setBrand(null);
		closeModal();
	};

	const handleEditClick = async () => {
		await getBrandData();
		openModal();
	};

	return (
		<>
			<Button type="primary" onClick={handleEditClick}>
				<EditOutlined />
			</Button>

			<BrandForm
				open={isModalOpen}
				title="Update Brand"
				onCreate={onCreate}
				onCancel={closeModal}
				brandValue={brand}
				key={brand?._id}
			/>
		</>
	);
};
