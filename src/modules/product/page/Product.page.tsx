import { Col, Row, Space } from "antd";
import { ProductTable } from "../components/ProductTable/ProductTable";
import { CreateProduct } from "../components/CreateProduct/CreateProduct";

const ProductPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22}>
				<ProductTable />
				<CreateProduct />
			</Col>
		</Row>
	);
};

export default ProductPage;
