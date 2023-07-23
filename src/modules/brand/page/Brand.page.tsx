import { Col, Row } from "antd";

import { BrandTable } from "../components/BrandTable/BrandTable";
import { CreateBrand } from "../components/CreateBrand/CreateBrand";

const BrandPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<BrandTable />
				<CreateBrand />
			</Col>
		</Row>
	);
};

export default BrandPage;
