export type Brand = { _id: string; name: string, photoUrl: string }

export type BrandResponse = {
    brands: Brand[]
    currentPage: number
    totalPages: number,
    totalBrands: number,
}

export type FilterParams = {
    page?: number
    limit?: number
}

export interface BrandState {
    brandList: Brand[]
    currentPage: number
    totalPages: number,
    totalBrands: number,
    brandsLimit: number

    isDataUpdated: boolean
    isLoading: boolean

    getBrands: () => Promise<void>

    setIsDataUpdated: () => void
    setCurrentPage: (page: number) => void
}