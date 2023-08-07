export interface OrderItem {
    image: string
    price: number
    product?: string
    qty: number
    title: string
    _id: string
}

interface CustomerData {
    name: string
    surname: string
    email: string
}

interface ShippingAddress {
    city: string
    address: string
    postalCode: string
    country: string
}

export type Order = {
    createdAt: string
    customerData: CustomerData
    inDelivery?: boolean
    isDelivered: boolean
    deliveredAt?: string
    isPaid: boolean
    paidAt?: string
    itemsPrice: number
    orderItems: OrderItem[]
    paymentMethod: string
    shippingAddress: ShippingAddress
    shippingPrice: number
    taxPrice: number
    totalPrice: number
    updatedAt: string
    user: string
    _id: string
}

export type OrderResponse = {
    orders: Order[]
    currentPage: number
    totalPages: number,
    totalOrders: number,
}

export type FilterParams = {
    isPaid?: boolean
    custumerEmail?: string
    createdAtFrom?: Date
    createdAtUpTo?: Date
    orderId?: string
    page?: number
    limit?: number
}

export interface OrderState {
    ordersList: Order[] | []
    currentPage: number
    totalPages: number,
    totalOrders: number,
    ordersLimit: number

    orderDateFilter: [Date, Date] | []
    orderIdFilter: string
    orderEmailFilter: string
    orderIsPaidFilter: boolean | null
    orderInDeliveryFilter: boolean | null
    orderIsDeliveredFilter: boolean | null

    isDataUpdated: boolean
    isLoading: boolean


    setIsDataUpdated: () => void

    setOrderDateFilter: (date: [Date, Date] | []) => void
    setOrderIdFilter: (orderId: string) => void
    setOrderEmailFilter: (email: string) => void
    setOrderIsPaidFilter: (isPaid: boolean) => void
    setOrderInDeliveryFilter: (inDelivery: boolean) => void
    setOrderIsDeliveredFilter: (isDelivered: boolean) => void

    setCurrentPage: (page: number) => void

    clearFilters: () => void;

    getOrders: () => Promise<void>

}