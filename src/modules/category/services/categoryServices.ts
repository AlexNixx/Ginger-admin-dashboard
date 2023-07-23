import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"
import type { Category, CategoryResponse, FilterParams } from "../model/CategoryTypes"

export const getAllCategory = async (params: FilterParams): Promise<AxiosResponse<CategoryResponse>> => {
    return $api.get("/category", { params });
}

export const getOneCategory = async (categoryId: string): Promise<AxiosResponse<Category>> => {
    return $api.get(`/category/${categoryId}`,);
}
export const createCategory = async (Product: FormData): Promise<AxiosResponse> => {
    return $api.post("/category/", Product);
}

export const updateCategory = async (categoryId: string, Category: FormData): Promise<AxiosResponse<Category>> => {
    return $api.put(`/category/${categoryId}`, Category);
}

export const deleteCategory = async (categoryId: string): Promise<AxiosResponse> => {
    return $api.delete(`/category/${categoryId}`);
}
