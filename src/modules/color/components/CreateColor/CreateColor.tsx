import { Button, message } from "antd";

import { useModal } from "shared/hook/useModal";
import { createColor } from "modules/color/services/colorServices";
import { useColorStore } from "modules/color/model/useColor";
import { ColorForm } from "../ColorForm/ColorForm";

export const CreateColor = () => {
	const { isModalOpen, openModal, closeModal } = useModal();
	const { setIsDataUpdated } = useColorStore();

	const onCreate = async (data: any) => {
		const color = {
			name: data.name,
			rgb: data.rgb.toHexString(),
		};

		console.log(color);

		try {
			await createColor(color);
			message.success("The color was successfully added");
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
				Add new color
			</Button>

			<ColorForm
				open={isModalOpen}
				title="Create new Color"
				onCreate={onCreate}
				onCancel={closeModal}
			/>
		</>
	);
};
