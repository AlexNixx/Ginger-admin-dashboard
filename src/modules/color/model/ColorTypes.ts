export type Color = { _id: string; name: string, rgb: string }

export type ColorResponse = {
    colors: Color[]
    currentPage: number
    totalPages: number,
    totalColors: number,
}

export type ColorRequest = {
    name: string,
    rgb: string
}

export type FilterParams = {
    page?: number
    limit?: number
}

export interface ColorState {
    colorsList: Color[]
    currentPage: number
    totalPages: number,
    totalColors: number,
    colorsLimit: number

    isDataUpdated: boolean
    isLoading: boolean

    getColors: () => Promise<void>

    setIsDataUpdated: () => void
    setCurrentPage: (page: number) => void
}