import { create } from "zustand"
import { devtools } from "zustand/middleware"

import { AxiosError } from "axios";

import { login, logout, refreshAccessToken } from "../services/authServices";

import { AuthState, User, ErrorResponse } from "./AuthResponse"

export const useAuthStore = create<AuthState>()(devtools(((set) => ({
    user: null,
    accessToken: "",
    isSuccess: false,
    isLoading: false,
    isError: false,
    error: "",
    setUser: (user: User) =>
        set((state) => ({
            user,
        })),
    login: async (email, password) => {
        set((state) => ({ isLoading: true, error: '' }));

        try {
            const response = await login(email, password);

            set((state) => ({
                user: response.data.user,
                accessToken: response.data.accessToken,
                isSuccess: true,
                isLoading: false,
                error: '',
            }));

        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            const message = err?.response?.data.message

            console.log(message)
            set((state) => ({
                isLoading: false,
                isError: true,
                error: message || 'An error occurred during login.'
            }));
        }
    },
    logout: async () => {
        set((state) => ({ isLoading: true, error: '' }));

        try {
            await logout();

            set((state) => ({
                user: null,
                accessToken: "",
                isLoading: false,
                isSuccess: false,
                isError: false,
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
    refresh: async () => {
        try {
            const response = await refreshAccessToken();
            set((state) => ({
                user: response.data.user,
                accessToken: response.data.accessToken,
                isSuccess: true,
            }));


        } catch (error) {
            const err = error as AxiosError<ErrorResponse>;
            const message = err?.response?.data.message

            set((state) => ({
                isError: true,
                error: message || 'An error occurred during login.'
            }));
        }
    },

}))));
