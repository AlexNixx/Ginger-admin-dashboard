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

export type FilterParams = {
    categories?: string
    brands?: string
    slug?: string
    page?: number
    limit?: number
}

export type ProductsResponse = {
    products: Product[]
    currentPage: number
    totalPages: number
    totalProducts: number
}

export type CategoryResponse = {
    categories: Category[]
    currentPage: number
    totalPages: number,
    totalCategories: number,
}

export type BrandResponse = {
    brands: Brand[]
    currentPage: number
    totalPages: number,
    totalBrands: number,
}

export interface ProductState {
    productsList: Product[]
    currentPage: number
    totalPages: number,
    totalProducts: number,
    productsLimit: number


    categories: Category[]
    brands: Brand[]
    colors: Color[]

    categoriesFilter: string[]
    brandsFilter: string[]
    slugFilter: string

    isDataUpdated: boolean
    isLoading: boolean

    getProducts: () => Promise<void>
    getCategories: () => Promise<void>
    getBrands: () => Promise<void>
    getColors: () => Promise<void>

    setIsDataUpdated: () => void
    setCurrentPage: (page: number) => void
    setSlugFilter: (productName: string) => void
    setBrandsFilter: (brands: string[]) => void
    setCategoriesFilter: (categories: string[]) => void
}