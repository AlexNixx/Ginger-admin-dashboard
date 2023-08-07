import { Col, Input, Row } from "antd";
import { useOrderStore } from "modules/orders/model/useOrder";

import type { ChangeEvent } from "react";

export const SearchById = () => {
	const { orderIdFilter, setOrderIdFilter, setIsDataUpdated } = useOrderStore();

	const handleSetSearchId = (e: ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;

		setOrderIdFilter(searchValue);
		setIsDataUpdated();
	};

	return (
		<Row>
			<Col style={{ padding: "1rem", minWidth: "20rem" }}>
				<Input
					placeholder="Search by Order Id"
					onChange={handleSetSearchId}
					value={orderIdFilter}
				/>
			</Col>
		</Row>
	);
};
