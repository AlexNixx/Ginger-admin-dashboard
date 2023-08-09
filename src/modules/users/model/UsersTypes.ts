type ShippingAddress = {
    city: string
    address: string
    postalCode: string
    country: string
}

export type User = {
    name: string,
    surname: string,
    email: string,
    id: string,
    isActivated: boolean,
    role: "ADMIN" | "USER",
    address: ShippingAddress,
}

export type UsersResponse = {
    users: User[]
    currentPage: number
    totalPages: number,
    totalUsers: number,
}

export type FilterParams = {
    page?: number
    limit?: number
    userEmail?: string
}

export interface UsersState {
    usersList: User[]
    currentPage: number
    totalPages: number,
    totalUsers: number,
    usersLimit: number

    userEmailFilter: string

    isDataUpdated: boolean
    isLoading: boolean

    getUsers: () => Promise<void>

    setUserEmailFilter: (email: string) => void
    setIsDataUpdated: () => void
    setCurrentPage: (page: number) => void
}