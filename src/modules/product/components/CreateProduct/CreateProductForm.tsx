import {
	Form,
	Input,
	InputNumber,
	Select,
	Space,
	Switch,
	Button,
	Upload,
	message,
	Modal,
} from "antd";

import type { UploadProps } from "antd";

import {
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";
import { FC } from "react";
import { Product } from "modules/product/model/ProductTypes";

interface Info {
	title: string;
	description: string;
}

export type ProductFormValues = {
	title: string;
	price: number;
	category: string;
	brand: string;
	color: string;
	inStock: boolean;
	deviceInfo: Info[];
	photoUrl: FileList;
};

interface CreateProductFormProps {
	open: boolean;
	onCreate: (values: ProductFormValues) => void;
	onCancel: () => void;
	productValue?: Product;
}

export const CreateProductForm: FC<CreateProductFormProps> = ({
	open,
	onCreate,
	onCancel,
	productValue,
}) => {
	const [form] = Form.useForm();

	const normFile = (e: any) => {
		if (Array.isArray(e)) {
			return e;
		}
		return e?.fileList;
	};

	const uploadProps: UploadProps = {
		beforeUpload: (file) => {
			const isPNG = file.type === "image/png";
			if (!isPNG) {
				message.error(`${file.name} is not a png file`);
			}
			return isPNG || Upload.LIST_IGNORE;
		},
	};

	return (
		<Modal
			open={open}
			title="Create a new collection"
			okText="Create"
			cancelText="Cancel"
			onCancel={onCancel}
			onOk={() => {
				form
					.validateFields()
					.then((values: ProductFormValues) => {
						form.resetFields();
						onCreate(values);
					})
					.catch((info) => {
						console.log("Validate Failed:", info);
					});
			}}
		>
			<Form
				name="product"
				form={form}
				initialValues={{
					title: productValue?.title,
					price: productValue?.price,
					category: productValue?.category._id,
					brand: productValue?.brand._id,
					color: productValue?.color._id,
					deviceInfo: productValue?.deviceInfo,
					photoUrl: productValue?.photoUrl
						? [
								{
									uid: "-1",
									name: "product-photo",
									status: "done",
									url: `${process.env.REACT_APP_SERVER_ENDPOINT}/${productValue.photoUrl}`,
								},
						  ]
						: [],
					inStoke: productValue?.inStock || true,
				}}
			>
				<Form.Item
					label="Title"
					name="title"
					rules={[{ required: true, message: "Please input title!" }]}
				>
					<Input placeholder="Title" />
				</Form.Item>
				<Form.Item
					label="Price"
					name="price"
					rules={[{ required: true, message: "Please input price!" }]}
				>
					<InputNumber min={1} />
				</Form.Item>

				<Form.Item
					label="Category"
					name="category"
					rules={[{ required: true, message: "Please set category!" }]}
				>
					<Select placeholder="I'm Select category" allowClear>
						<Select.Option value="64012f858a62a6e9894db1e1">
							category 1
						</Select.Option>
						<Select.Option value="2">category 2</Select.Option>
						<Select.Option value="3">category 3</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="Brand"
					name="brand"
					rules={[{ required: true, message: "Please set brand!" }]}
				>
					<Select placeholder="I'm Select brand" allowClear>
						<Select.Option value="640131468a62a6e9894db1ef">
							Brand 1
						</Select.Option>
						<Select.Option value="2">Brand 2</Select.Option>
						<Select.Option value="3">Brand 3</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item
					label="Color"
					name="color"
					rules={[{ required: true, message: "Please set color!" }]}
				>
					<Select placeholder="I'm Select color" allowClear>
						<Select.Option value="640132348a62a6e9894db20e">
							Color 1
						</Select.Option>
						<Select.Option value="2">Color 2</Select.Option>
						<Select.Option value="3">Color 3</Select.Option>
					</Select>
				</Form.Item>
				<Form.Item valuePropName="checked" label="In Stoke" name="inStoke">
					<Switch />
				</Form.Item>
				<Form.List name="deviceInfo">
					{(fields, { add, remove }) => (
						<>
							{fields.map(({ key, name, ...restField }) => (
								<Space
									key={key}
									style={{ display: "flex", marginBottom: 8 }}
									align="baseline"
								>
									<Form.Item
										{...restField}
										name={[name, "title"]}
										rules={[
											{
												required: true,
												message: "Missing characteristics title",
											},
										]}
									>
										<Input placeholder="Characteristics title" />
									</Form.Item>
									<Form.Item
										{...restField}
										name={[name, "description"]}
										rules={[
											{
												required: true,
												message: "Missing Characteristics desc",
											},
										]}
									>
										<Input placeholder="Characteristics desc" />
									</Form.Item>
									<MinusCircleOutlined onClick={() => remove(name)} />
								</Space>
							))}
							<Form.Item>
								<Button
									type="dashed"
									onClick={() => add()}
									block
									icon={<PlusOutlined />}
								>
									Add field
								</Button>
							</Form.Item>
						</>
					)}
				</Form.List>
				<Form.Item
					label="Product Image"
					name="photoUrl"
					valuePropName="fileList"
					getValueFromEvent={normFile}
					rules={[{ required: true, message: "Please add product image!" }]}
				>
					<Upload {...uploadProps}>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};
