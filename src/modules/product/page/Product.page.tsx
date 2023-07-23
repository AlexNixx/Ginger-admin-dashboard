import { Col, Row } from "antd";
import { ProductTable } from "../components/ProductTable/ProductTable";
import { CreateProduct } from "../components/CreateProduct/CreateProduct";

const ProductPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<ProductTable />
				<CreateProduct />
			</Col>
		</Row>
	);
};

export default ProductPage;
