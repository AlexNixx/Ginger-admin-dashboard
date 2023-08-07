import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { getAllOrders } from "../services/orderServices";
import type { FilterParams, Order, OrderState } from "./OrderTypes";


export const useOrderStore = create<OrderState>()(devtools(((set) => ({
    ordersList: [],
    currentPage: 1,
    totalPages: 1,
    totalOrders: 0,
    ordersLimit: 10,

    orderDateFilter: [],
    orderIdFilter: "",
    orderEmailFilter: "",
    orderIsPaidFilter: null,
    orderInDeliveryFilter: null,
    orderIsDeliveredFilter: null,

    isDataUpdated: false,
    isLoading: false,

    setIsDataUpdated: () => {
        set((state) => ({ isDataUpdated: true }))
    },

    setOrderDateFilter: (data) => {
        set((state) => ({ orderDateFilter: data, currentPage: 1 }))
    },

    setOrderIdFilter: (orderId) => {
        set((state) => ({ orderIdFilter: orderId, currentPage: 1 }))
    },
    setOrderEmailFilter: (email) => {
        set((state) => ({ orderEmailFilter: email, currentPage: 1 }))
    },
    setOrderIsPaidFilter: (isPaid) => {
        set((state) => ({ orderIsPaidFilter: isPaid, currentPage: 1 }))
    },
    setOrderInDeliveryFilter: (inDelivery) => {
        set((state) => ({ orderInDeliveryFilter: inDelivery, currentPage: 1 }))
    },
    setOrderIsDeliveredFilter: (isDelivered) => {
        set((state) => ({ orderIsDeliveredFilter: isDelivered, currentPage: 1 }))
    },

    setCurrentPage: (page) => {
        set((state) => ({ currentPage: +page }))
    },

    getOrders: async () => {
        set((state) => ({ isLoading: true }));

        try {
            const response = await getAllOrders(
                {
                    limit: useOrderStore.getState().ordersLimit,
                    page: useOrderStore.getState().currentPage,
                    createdAtFrom: useOrderStore.getState().orderDateFilter[0],
                    createdAtUpTo: useOrderStore.getState().orderDateFilter[1],
                    orderId: useOrderStore.getState().orderIdFilter,
                    custumerEmail: useOrderStore.getState().orderEmailFilter,
                }
            );

            const ordersList = response.data.orders.map((order: Order) => ({
                ...order,
                key: order._id,
            }))

            set((state) => ({
                ordersList: ordersList,
                currentPage: +response.data.currentPage,
                totalPages: response.data.totalPages,
                totalOrders: response.data.totalOrders,
                isLoading: false,
                isDataUpdated: false,
            }));

        } catch (error) {
            console.log(error)

            set((state) => ({
                isLoading: false,
                isDataUpdated: false,
            }));
        }
    },

    clearFilters: () => {
        set((state) => ({
            currentPage: 1,
            totalPages: 1,
            totalOrders: 0,
            ordersLimit: 10,

            orderDateFilter: [],
            orderIdFilter: "",
            orderEmailFilter: "",
            orderIsPaidFilter: null,
            orderInDeliveryFilter: null,
            orderIsDeliveredFilter: null,
        }));
    }


}))));
