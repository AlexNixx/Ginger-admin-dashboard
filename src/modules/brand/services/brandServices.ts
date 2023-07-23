import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import type { BrandResponse, FilterParams, Brand } from "../model/BrandTypes";

export const getAllBrands = async (params: FilterParams): Promise<AxiosResponse<BrandResponse>> => {
    return $api.get("/brand", { params });
}

export const getOneBrand = async (brandId: string): Promise<AxiosResponse<Brand>> => {
    return $api.get(`/brand/${brandId}`,);
}

export const createBrand = async (Brand: FormData): Promise<AxiosResponse> => {
    return $api.post("/brand/", Brand);
}

export const updateBrand = async (brandId: string, Brand: FormData): Promise<AxiosResponse<Brand>> => {
    return $api.put(`/brand/${brandId}`, Brand);
}

export const deleteBrand = async (brandId: string): Promise<AxiosResponse> => {
    return $api.delete(`/brand/${brandId}`);
}
