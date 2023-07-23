export type Category = { _id: string; name: string, photoUrl: string }

export type CategoryResponse = {
    categories: Category[]
    currentPage: number
    totalPages: number,
    totalCategories: number,
}

export type FilterParams = {
    page?: number
    limit?: number
}

export interface CategoryState {
    categoryList: Category[]
    currentPage: number
    totalPages: number,
    totalCategories: number,
    categoriesLimit: number

    isDataUpdated: boolean
    isLoading: boolean

    getCategories: () => Promise<void>

    setIsDataUpdated: () => void
    setCurrentPage: (page: number) => void
}