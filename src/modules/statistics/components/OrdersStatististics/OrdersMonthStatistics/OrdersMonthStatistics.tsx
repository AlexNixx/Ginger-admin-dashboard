import type { DaysData } from "modules/statistics/model/StatisticsTypes";
import { useStatisticsStore } from "modules/statistics/model/useStatistics";
import { getOrderMonthStatistics } from "modules/statistics/services/statisticsServices";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts";

export const OrdersMonthStatistics = () => {
	const statisticStore = useStatisticsStore();

	useEffect(() => {
		statisticStore.getOrderMonthStatistics();
	}, []);

	return (
		<BarChart
			width={1000}
			height={400}
			data={statisticStore.orderMonthStatisticsData}
			margin={{ bottom: 50, left: -30, right: 30, top: 10 }}
		>
			<XAxis dataKey="day" angle={-90} dy={40} style={{ fontSize: 11 }} />
			<YAxis />
			<Tooltip />
			<Bar dataKey="count" fill="#1677FF" />
		</BarChart>
	);
};
