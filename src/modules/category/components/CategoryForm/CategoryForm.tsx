import { FC } from "react";

import { Form, Input, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import type { Category } from "modules/category/model/CategoryTypes";

import { normalizeFile } from "shared/utils/normalizeFile";
import { uploadFileProps } from "shared/utils/uploadFileProps";

interface CategoryFormProps {
	open: boolean;
	title: string;
	onCreate: (values: any) => void;
	onCancel: () => void;
	categoryValue?: Category | null;
}

export const CategoryForm: FC<CategoryFormProps> = ({
	open,
	title,
	onCreate,
	onCancel,
	categoryValue,
}) => {
	const [form] = Form.useForm();

	const initialValues = {
		name: categoryValue?.name,
		photoUrl: categoryValue?.photoUrl
			? [
					{
						uid: "-1",
						name: "product-photo",
						status: "done",
						url: `${process.env.REACT_APP_SERVER_ENDPOINT}/${categoryValue.photoUrl}`,
					},
			  ]
			: [],
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
			<Form name="category" form={form} initialValues={initialValues}>
				<Form.Item
					label="Title"
					name="name"
					rules={[{ required: true, message: "Please input title!" }]}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Category Image"
					name="photoUrl"
					valuePropName="fileList"
					getValueFromEvent={normalizeFile}
					rules={[{ required: true, message: "Please add category image!" }]}
				>
					<Upload {...uploadFileProps}>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};
