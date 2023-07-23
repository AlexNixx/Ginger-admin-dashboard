import { Col, Input, Row } from "antd";
import { useProductStore } from "modules/product/model/useProduct";
import { ChangeEvent } from "react";

export const SearchByName = () => {
	const { slugFilter, setSlugFilter } = useProductStore();

	const handleSetSearchName = (e: ChangeEvent<HTMLInputElement>) => {
		setSlugFilter(e.target.value);
	};

	return (
		<Row>
			<Col style={{ padding: "1rem", minWidth: "20rem" }}>
				<Input placeholder="Search by name" onChange={handleSetSearchName} />
			</Col>
		</Row>
	);
};
