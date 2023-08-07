import { Col, Input, Row } from "antd";
import { useOrderStore } from "modules/orders/model/useOrder";

import type { ChangeEvent } from "react";

export const SearchByEmail = () => {
	const { orderEmailFilter, setOrderEmailFilter, setIsDataUpdated } =
		useOrderStore();

	const handleSetSearchEmail = (e: ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;

		setOrderEmailFilter(searchValue);
		setIsDataUpdated();
	};

	return (
		<Row>
			<Col style={{ padding: "1rem", minWidth: "20rem" }}>
				<Input
					placeholder="Search by User Email"
					onChange={handleSetSearchEmail}
					value={orderEmailFilter}
				/>
			</Col>
		</Row>
	);
};
