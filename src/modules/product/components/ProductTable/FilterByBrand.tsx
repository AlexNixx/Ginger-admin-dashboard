import { Checkbox, Col, Row } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useProductStore } from "modules/product/model/useProduct";
import { getOptions } from "modules/product/utils/getOptions";

export const FilterByBrand = () => {
	const { brands, setBrandsFilter } = useProductStore();

	const handleSetBrandFilter = (checkedValues: CheckboxValueType[]) => {
		setBrandsFilter(checkedValues as string[]);
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
					options={getOptions(brands)}
					onChange={handleSetBrandFilter}
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
