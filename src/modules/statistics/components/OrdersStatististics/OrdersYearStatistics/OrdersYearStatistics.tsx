import { MonthData } from "modules/statistics/model/StatisticsTypes";
import { useStatisticsStore } from "modules/statistics/model/useStatistics";
import { getOrderYearStatistics } from "modules/statistics/services/statisticsServices";

import { useState, useCallback, useEffect, FC } from "react";
import { BarChart, Bar, Cell, XAxis, YAxis, Tooltip } from "recharts";

interface OrdersYearStatisticsProps {
	setOpenDetails: (open: boolean) => void;
}

export const OrdersYearStatistics: FC<OrdersYearStatisticsProps> = ({
	setOpenDetails,
}) => {
	const statisticStore = useStatisticsStore();

	useEffect(() => {
		statisticStore.getOrderYearStatistics();
	}, [statisticStore.isDataUpdated]);

	const handleClick = useCallback(
		(index: any) => {
			statisticStore.setCurrentOrderMonth(index.month, index.monthName);
			setOpenDetails(true);
		},
		[statisticStore.setCurrentOrderMonth]
	);

	return (
		<BarChart
			width={1000}
			height={400}
			data={statisticStore.orderYearStatisticsData}
			margin={{ left: -30 }}
		>
			<XAxis dataKey="monthName" />
			<YAxis />
			<Tooltip />
			<Bar dataKey="count" onClick={handleClick} fill="#1677FF">
				{statisticStore.orderYearStatisticsData.map((_, index) => (
					<Cell cursor="pointer" key={`cell-${index}`} />
				))}
			</Bar>
		</BarChart>
	);
};
