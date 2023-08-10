import { useState } from "react";
import { Button, Select, Space, Spin, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

import { OrdersMonthStatistics } from "../OrdersMonthStatistics/OrdersMonthStatistics";
import { OrdersYearStatistics } from "../OrdersYearStatistics/OrdersYearStatistics";

import { useStatisticsStore } from "modules/statistics/model/useStatistics";

export const OrdersStatististics = () => {
	const statisticStore = useStatisticsStore();
	const [openDetails, setOpenDetails] = useState<boolean>(false);

	const handleBack = () => {
		setOpenDetails(false);
	};

	const onChange = (value: string) => {
		statisticStore.setCurrentOrderYear(+value);
		statisticStore.setIsDataUpdated();
	};

	return (
		<Space direction="vertical" size={"middle"}>
			<Space size={"large"}>
				<Button onClick={handleBack} disabled={!openDetails}>
					<ArrowLeftOutlined /> Back
				</Button>
				<Select
					defaultValue={statisticStore.currentOrderYear.toString()}
					disabled={openDetails}
					onChange={onChange}
					options={[
						{
							value: "2023",
							label: "2023",
						},
						{
							value: "2022",
							label: "2022",
						},
						{
							value: "2021",
							label: "2021",
						},
					]}
				/>
			</Space>
			<Space
				direction="vertical"
				align="center"
				style={{
					borderRadius: "5px",
					border: "1px solid #F0F0F0",
					backgroundColor: "#FAFAFA",
					padding: "1rem",
				}}
				size={"middle"}
			>
				{!openDetails ? (
					<>
						<Typography.Title level={3}>
							Statistics on the number of orders per year
						</Typography.Title>
						<OrdersYearStatistics setOpenDetails={setOpenDetails} />
					</>
				) : (
					<>
						<Typography.Title level={3}>
							{`Statistics on the number of orders for the month of ${statisticStore.currentOrderMonth.name}`}
						</Typography.Title>
						<OrdersMonthStatistics />
					</>
				)}
			</Space>
		</Space>
	);
};
