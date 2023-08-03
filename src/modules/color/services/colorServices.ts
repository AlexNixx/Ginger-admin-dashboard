import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import type { ColorResponse, FilterParams, Color, ColorRequest } from "../model/ColorTypes";

export const getAllColors = async (params: FilterParams): Promise<AxiosResponse<ColorResponse>> => {
    return $api.get("/color", { params });
}

export const getOneColor = async (colorId: string): Promise<AxiosResponse<Color>> => {
    return $api.get(`/color/${colorId}`,);
}

export const createColor = async (Color: ColorRequest): Promise<AxiosResponse> => {
    return $api.post("/color/", Color);
}

export const updateColor = async (colorId: string, Color: ColorRequest): Promise<AxiosResponse<Color>> => {
    return $api.put(`/color/${colorId}`, Color);
}

export const deleteColor = async (colorId: string): Promise<AxiosResponse> => {
    return $api.delete(`/color/${colorId}`);
}