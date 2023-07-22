import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import { ProductsResponse, FilterParams, Product } from "../model/ProductTypes";

export const getAllProduct = async (params: FilterParams): Promise<AxiosResponse<ProductsResponse>> => {
    return $api.get("/product/", { params });
}

export const getOneProduct = async (productId: string): Promise<AxiosResponse<Product>> => {
    return $api.get(`/product/${productId}`,);
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
