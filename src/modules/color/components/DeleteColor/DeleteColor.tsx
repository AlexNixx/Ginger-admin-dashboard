import { FC } from "react";

import { Button, Popconfirm, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

import { useColorStore } from "modules/color/model/useColor";
import { deleteColor } from "modules/color/services/colorServices";

interface DeleteColorProps {
	colorId: string;
}

export const DeleteColor: FC<DeleteColorProps> = ({ colorId }) => {
	const { setIsDataUpdated } = useColorStore();

	const handleDeleteColor = async () => {
		try {
			await deleteColor(colorId);
			message.success("The color was successfully removed");
			setIsDataUpdated();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Popconfirm
			title="Delete the color"
			description="Are you sure to delete this color?"
			onConfirm={handleDeleteColor}
			okText="Yes"
			cancelText="No"
		>
			<Button type="primary" danger>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	);
};
