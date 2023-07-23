import { FC } from "react";

import { Form, Input, Button, Upload, Modal } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import type { Brand } from "modules/brand/model/BrandTypes";

import { normalizeFile } from "shared/utils/normalizeFile";
import { uploadFileProps } from "shared/utils/uploadFileProps";

interface BrandFormProps {
	open: boolean;
	title: string;
	onCreate: (values: any) => void;
	onCancel: () => void;
	brandValue?: Brand | null;
}

export const BrandForm: FC<BrandFormProps> = ({
	open,
	title,
	onCreate,
	onCancel,
	brandValue,
}) => {
	const [form] = Form.useForm();

	const initialValues = {
		name: brandValue?.name,
		photoUrl: brandValue?.photoUrl
			? [
					{
						uid: "-1",
						name: "product-photo",
						status: "done",
						url: `${process.env.REACT_APP_SERVER_ENDPOINT}/${brandValue.photoUrl}`,
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
			<Form name="brand" form={form} initialValues={initialValues}>
				<Form.Item
					label="Title"
					name="name"
					rules={[{ required: true, message: "Please input title!" }]}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Brand Image"
					name="photoUrl"
					valuePropName="fileList"
					getValueFromEvent={normalizeFile}
					rules={[{ required: true, message: "Please add brand image!" }]}
				>
					<Upload {...uploadFileProps}>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};
