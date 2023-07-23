import { Checkbox, Col, Row } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useProductStore } from "modules/product/model/useProduct";
import { getOptions } from "modules/product/utils/getOptions";

export const FilterByCategory = () => {
	const { categories, setCategoriesFilter } = useProductStore();

	const handleSetCategoriesFilter = (checkedValues: CheckboxValueType[]) => {
		setCategoriesFilter(checkedValues as string[]);
	};

	return (
		<Row
			style={{
				maxHeight: "450px",
				overflow: "auto",
			}}
		>
			<Col span={4}>
				<Checkbox.Group
					options={getOptions(categories)}
					onChange={handleSetCategoriesFilter}
					style={{
						display: "flex",
						flexDirection: "column",
						padding: "1rem",
						gap: "1rem",
					}}
				/>
			</Col>
		</Row>
	);
};
