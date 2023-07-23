import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import type { ProductsResponse, FilterParams, Product, Category, Brand, Color } from "../model/ProductTypes";

export const getAllProduct = async (params: FilterParams): Promise<AxiosResponse<ProductsResponse>> => {
    return $api.get("/product", { params });
}

export const getOneProduct = async (productId: string): Promise<AxiosResponse<Product>> => {
    return $api.get(`/product/${productId}`,);
}

export type CategoryResponse = {
    categories: Category[]
    currentPage: number
    totalPages: number,
    totalCategories: number,
}

export const getCategories = async (): Promise<AxiosResponse<CategoryResponse>> => {
    return $api.get(`/category`,);
}

export const getBrands = async (): Promise<AxiosResponse<Brand[]>> => {
    return $api.get(`/brand`,);
}

export const getColors = async (): Promise<AxiosResponse<Color[]>> => {
    return $api.get(`/color`,);
}

export const createProduct = async (Product: FormData): Promise<AxiosResponse> => {
    return $api.post("/product/", Product);
}

export const updateProduct = async (productId: string, Product: FormData): Promise<AxiosResponse<Product>> => {
    return $api.put(`/product/${productId}`, Product);
}

export const deleteProduct = async (productId: string): Promise<AxiosResponse> => {
    return $api.delete(`/product/${productId}`);
}
