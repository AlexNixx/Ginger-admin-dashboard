import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"
import { OrderMonthStatisticsResponse, OrderYearStatisticsResponse } from "../model/StatisticsTypes";

export const getOrderYearStatistics = async (year: number): Promise<AxiosResponse<OrderYearStatisticsResponse>> => {
    return $api.get(`/order/statistic/${year}}`);
}

export const getOrderMonthStatistics = async (year: number, month: number): Promise<AxiosResponse<OrderMonthStatisticsResponse>> => {
    return $api.get(`/order/statistic/${year}/${month}`);
}