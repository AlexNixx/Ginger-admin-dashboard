type Info = {
    title: string
    description: string
}

export type Product = {
    _id: string
    title: string
    price: number
    category: { _id: string; name: string }
    brand: { _id: string; name: string }
    color: { _id: string; name: string; rgb: string }
    deviceInfo: Info[]
    inStock: boolean
    photoUrl: string
}

export type ProductsResponse = {
    products: Product[]
    currentPage: number
    totalPages: number
    totalProducts: number
}

export type FilterParams = {
    categories?: string
    brands?: string
    slug?: string
    page?: number
    limit?: number
}