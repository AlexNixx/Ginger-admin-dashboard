import { Col, Input, Row } from "antd";
import { useUsersStore } from "modules/users/model/useUsers";

import type { ChangeEvent } from "react";

export const SearchByEmail = () => {
	const { userEmailFilter, setUserEmailFilter, setIsDataUpdated } =
		useUsersStore();

	const handleSetSearchEmail = (e: ChangeEvent<HTMLInputElement>) => {
		const searchValue = e.target.value;

		setUserEmailFilter(searchValue);
		setIsDataUpdated();
	};

	return (
		<Row>
			<Col style={{ padding: "1rem", minWidth: "20rem" }}>
				<Input
					placeholder="Search by User Email"
					onChange={handleSetSearchEmail}
					value={userEmailFilter}
				/>
			</Col>
		</Row>
	);
};
