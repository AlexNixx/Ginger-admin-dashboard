export interface ErrorResponse {
    message: string;
}

export interface User {
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

export interface AuthState {
    user: User | null,
    accessToken: string,
    isSuccess: boolean,
    isLoading: boolean,
    isError: boolean,
    error: string,
    setUser: (user: User) => void
    login: (email: string, password: string) => Promise<void>
    logout: () => Promise<void>
    refresh: () => Promise<void>
}

