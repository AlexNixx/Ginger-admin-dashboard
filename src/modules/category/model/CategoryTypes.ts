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