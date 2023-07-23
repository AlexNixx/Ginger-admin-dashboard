type Info = {
    title: string
    description: string
}

export type Category = { _id: string; name: string }
export type Brand = { _id: string; name: string }
export type Color = { _id: string; name: string, rgb: string }

export type Product = {
    _id: string
    title: string
    price: number
    category: Category
    brand: Brand
    color: Color
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