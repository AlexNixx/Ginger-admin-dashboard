interface User {
    name: string,
    surname: string,
    email: string,
    id: string,
    isActivated: boolean,
    role: "ADMIN" | "USER",
    address: string,
}

export interface AuthResponse {
    accessToken: string,
    refreshToken: string,
    user: User

}