import { FC, useState } from "react";

import { Button, message } from "antd";
import { EditOutlined } from "@ant-design/icons";

import { useModal } from "shared/hook/useModal";

import { useColorStore } from "modules/color/model/useColor";
import type { Color } from "modules/color/model/ColorTypes";
import { getOneColor, updateColor } from "modules/color/services/colorServices";
import { ColorForm } from "../ColorForm/ColorForm";

interface EditColorProps {
	colorId: string;
}

export const EditColor: FC<EditColorProps> = ({ colorId }) => {
	const { setIsDataUpdated } = useColorStore();
	const [color, setColor] = useState<Color | null>();
	const { isModalOpen, openModal, closeModal } = useModal();

	const getColorData = async () => {
		const colorResponse = await getOneColor(colorId);
		setColor(colorResponse.data);
	};

	const onCreate = async (data: any) => {
		const color = {
			name: data.name,
			rgb: data.rgb.toHexString(),
		};

		try {
			await updateColor(colorId, color);
			message.success("The color was successfully updated");
		} catch (error) {
			console.log(error);
		}

		setIsDataUpdated();
		setColor(null);
		closeModal();
	};

	const handleEditClick = async () => {
		await getColorData();
		openModal();
	};

	return (
		<>
			<Button type="primary" onClick={handleEditClick}>
				<EditOutlined />
			</Button>

			<ColorForm
				open={isModalOpen}
				title="Update Color"
				onCreate={onCreate}
				onCancel={closeModal}
				colorValue={color}
				key={color?._id}
			/>
		</>
	);
};
