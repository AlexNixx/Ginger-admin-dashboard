import { Col, Row } from "antd";

import { ColorTable } from "../components/ColorTable/ColorTable";
import { CreateColor } from "../components/CreateColor/CreateColor";

const ColorPage = () => {
	return (
		<Row justify={"center"}>
			<Col span={22} style={{ padding: "1rem 0 3rem" }}>
				<ColorTable />
				<CreateColor />
			</Col>
		</Row>
	);
};

export default ColorPage;
