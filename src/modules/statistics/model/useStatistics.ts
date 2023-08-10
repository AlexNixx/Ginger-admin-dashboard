import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { getOrderMonthStatistics, getOrderYearStatistics } from "../services/statisticsServices";
import type { StatisticsState } from "./StatisticsTypes";

export const useStatisticsStore = create<StatisticsState>()(devtools(((set) => ({
    currentOrderYear: 2023,
    currentOrderMonth: {
        number: 8,
        name: ""
    },

    orderYearStatisticsData: [],
    orderMonthStatisticsData: [],


    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setCurrentOrderYear: (year) => {
        set((state) => ({ currentOrderYear: year }))
    },

    setCurrentOrderMonth: (month, monthName) => {
        set((state) => ({
            currentOrderMonth: {
                number: month,
                name: monthName
            }
        }))
    },

    getOrderYearStatistics: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const year = useStatisticsStore.getState().currentOrderYear;

            const response = await getOrderYearStatistics(year);
            set((state) => ({
                orderYearStatisticsData: response.data,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },

    getOrderMonthStatistics: async () => {
        set((state) => ({ isLoading: true }));
        try {
            const currentOrderYear = useStatisticsStore.getState().currentOrderYear
            const currentOrderMonth = useStatisticsStore.getState().currentOrderMonth.number

            const response = await getOrderMonthStatistics(currentOrderYear, currentOrderMonth);

            set((state) => ({
                orderMonthStatisticsData: response.data,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)
        }
    },



}))));
