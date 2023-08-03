import { FC } from "react";

import { Form, Input, Modal, ColorPicker } from "antd";

import type { Color } from "modules/color/model/ColorTypes";

interface ColorFormProps {
	open: boolean;
	title: string;
	onCreate: (values: any) => void;
	onCancel: () => void;
	colorValue?: Color | null;
}

export const ColorForm: FC<ColorFormProps> = ({
	open,
	title,
	onCreate,
	onCancel,
	colorValue,
}) => {
	const [form] = Form.useForm();

	const initialValues = {
		name: colorValue?.name,
		rgb: colorValue?.rgb,
	};

	return (
		<Modal
			open={open}
			title={title}
			okText="Submit"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values: any) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form name="brand" form={form} initialValues={initialValues}>
				<Form.Item
					label="Title"
					name="name"
					rules={[{ required: true, message: "Please input title!" }]}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Color"
					name="rgb"
					rules={[{ required: true, message: "Please select color!" }]}
				>
					{/* <Input placeholder="Title" /> */}
					<ColorPicker />
				</Form.Item>
			</Form>
		</Modal>
	);
};
