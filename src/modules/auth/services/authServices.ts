import { $api } from "shared/api/api"
import { AxiosResponse } from "axios"
import { AuthResponse } from "../models/AuthResponse"

export async function login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return $api.post("/user/signin", { email, password });
}


export const refreshAccessToken = async (): Promise<AxiosResponse<AuthResponse>> => {
    return $api.get("/user/refresh")
}