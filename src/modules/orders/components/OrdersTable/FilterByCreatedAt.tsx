import { DatePicker } from "antd";
import { useOrderStore } from "modules/orders/model/useOrder";

export const FilterByCreatedAt = () => {
	const { setOrderDateFilter, setIsDataUpdated } = useOrderStore();

	const handleSetCreatedAtFilter = (dataString: any) => {
		if (dataString) {
			setOrderDateFilter(dataString as [Date, Date]);
		} else {
			setOrderDateFilter([]);
		}

		setIsDataUpdated();
	};

	return (
		<DatePicker.RangePicker
			onChange={(dataString) => handleSetCreatedAtFilter(dataString)}
			autoFocus
		/>
	);
};
