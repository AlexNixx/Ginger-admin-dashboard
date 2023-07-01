import create from "zustand"
import { devtools } from "zustand/middleware"

import { AxiosError } from "axios";

import { login } from "../services/authServices";

import { AuthState, User, ErrorResponse } from "./AuthResponse"

export const useAuthStore = create<AuthState>()(devtools(((set) => ({
    user: null,
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: "",
    setUser: (user: User) =>
        set((state: AuthState) => ({
            user,
        })),
    login: async (email, password) => {
        set((state) => ({ isLoading: true, error: '' }));

        try {
            const response = await login(email, password);

            set((state) => ({
                user: response.data.user,
                isSuccess: true,
                isLoading: false,
                error: '',
            }));

        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            const message = err?.response?.data.message
            set((state) => ({
                isLoading: false,
                isError: true,
                error: message || 'An error occurred during login.'
            }));
        }
    },
}))));
