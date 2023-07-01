import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/AuthResponse"

export const login = async (email: string, password: string): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post("/user/signin", { email, password });
}

export const logout = async (): Promise<AxiosResponse> => {
    return $api.post("/user/logout");
}


export const refreshAccessToken = async (): Promise<AxiosResponse<AuthResponse>> => {
    return $api.get("/user/refresh")
}
