import { FC } from "react";

import {
	Form,
	Input,
	InputNumber,
	Select,
	Space,
	Switch,
	Button,
	Upload,
	Modal,
} from "antd";

import {
	MinusCircleOutlined,
	PlusOutlined,
	UploadOutlined,
} from "@ant-design/icons";

import { useProductStore } from "modules/product/model/useProduct";
import type { Product } from "modules/product/model/ProductTypes";

import { normalizeFile } from "shared/utils/normalizeFile";
import { uploadFileProps } from "shared/utils/uploadFileProps";

interface ProductFormProps {
	open: boolean;
	title: string;
	onCreate: (values: any) => void;
	onCancel: () => void;
	productValue?: Product | null;
}

export const ProductForm: FC<ProductFormProps> = ({
	open,
	title,
	onCreate,
	onCancel,
	productValue,
}) => {
	const productStore = useProductStore();

	const [form] = Form.useForm();

	const initialValues = {
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
			<Form name="product" form={form} initialValues={initialValues}>
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
						{productStore.categories.map((category) => (
							<Select.Option value={category._id}>
								{category.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Brand"
					name="brand"
					rules={[{ required: true, message: "Please set brand!" }]}
				>
					<Select placeholder="I'm Select brand" allowClear>
						{productStore.brands.map((brand) => (
							<Select.Option value={brand._id}>{brand.name}</Select.Option>
						))}
					</Select>
				</Form.Item>
				<Form.Item
					label="Color"
					name="color"
					rules={[{ required: true, message: "Please set color!" }]}
				>
					<Select placeholder="I'm Select color" allowClear>
						{productStore.colors.map((color) => (
							<Select.Option value={color._id}>{color.name}</Select.Option>
						))}
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
												message: "Missing characteristics description",
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
					getValueFromEvent={normalizeFile}
					rules={[{ required: true, message: "Please add product image!" }]}
				>
					<Upload {...uploadFileProps}>
						<Button icon={<UploadOutlined />}>Click to upload</Button>
					</Upload>
				</Form.Item>
			</Form>
		</Modal>
	);
};
