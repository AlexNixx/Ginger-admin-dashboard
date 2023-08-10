import { Row, Spin } from "antd";

export const Loader = () => {
	return (
		<Row
			justify={"center"}
			align={"middle"}
			style={{ height: "calc(100vh - 75px)" }}
		>
			<Spin size="large" />
		</Row>
	);
};
