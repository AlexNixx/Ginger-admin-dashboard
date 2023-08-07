import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import type { OrderResponse, FilterParams, Order } from "../model/OrderTypes";


export const getAllOrders = async (params: FilterParams): Promise<AxiosResponse<OrderResponse>> => {
    return $api.get("/order", { params });
}

export const getOneOrder = async (orderId: string): Promise<AxiosResponse<Order>> => {
    return $api.get(`/order/${orderId}`,);
}

export const updateToDelivered = async (orderId: string): Promise<AxiosResponse> => {
    return $api.put(`/order/${orderId}/delivered`);
}

export const deleteOrder = async (orderId: string): Promise<AxiosResponse> => {
    return $api.delete(`/order/${orderId}`);
}