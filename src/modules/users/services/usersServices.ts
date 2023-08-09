import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"

import type { UsersResponse, FilterParams } from "../model/UsersTypes"

export const getAllUsers = async (params: FilterParams): Promise<AxiosResponse<UsersResponse>> => {
    return $api.get("/user/getAll", { params });
}

export const deleteUser = async (userId: string): Promise<AxiosResponse> => {
    return $api.delete(`/user/${userId}`);
}

export const updateUserRole = async (userId: string): Promise<AxiosResponse> => {
    return $api.put(`/user/${userId}`);
}
