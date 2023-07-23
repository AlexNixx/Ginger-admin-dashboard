import { Col, Row } from "antd";

import { CategoryTable } from "../components/CategoryTable/CategoryTable";
import { CreateCategory } from "../components/CreateCategory/CreateCategory";

const CategotyPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<CategoryTable />
				<CreateCategory />
			</Col>
		</Row>
	);
};

export default CategotyPage;
