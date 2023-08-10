export type MonthData = {
    month: number;
    monthName: string,
    count: number;
};

export type DaysData = {
    day: string;
    count: number;
};

export type OrderYearStatisticsResponse = MonthData[];
export type OrderMonthStatisticsResponse = DaysData[];

export type StatisticsState = {
    currentOrderYear: number,
    currentOrderMonth: {
        number: number,
        name: string
    },

    orderYearStatisticsData: MonthData[],
    orderMonthStatisticsData: DaysData[],

    isDataUpdated: boolean,
    isLoading: boolean

    setIsDataUpdated: () => void,
    setCurrentOrderYear: (year: number) => void,
    setCurrentOrderMonth: (month: number, monthName: string) => void,

    getOrderYearStatistics: () => Promise<void>
    getOrderMonthStatistics: () => Promise<void>
}