import { Row, Spin } from "antd";

export const Loader = () => {
	return (
		<Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
			<Spin size="large" />
		</Row>
	);
};
