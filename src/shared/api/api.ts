import axios from "axios";

import { useAuthStore } from "modules/auth/models/useAuth";

const API_URL = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$api.interceptors.request.use(async (config) => {
    const token = await useAuthStore.getState().accessToken;
    config.headers.authorization = `Bearer ${token}`;

    return config
},
    error => {
        Promise.reject(error)
    }
)

let isRefreshing = false;
let failedQueue: (() => Promise<any>)[] = [];

const processQueue = async () => {
    while (failedQueue.length) {
        try {
            const request = failedQueue.shift();
            if (request) {
                await request();
            }
        } catch (error) {
            console.log('Error occurred while re-sending failed request:', error);
        }
    }
};

$api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push(async () => {
                        try {
                            const refreshedResponse = await $api(originalRequest);
                            resolve(refreshedResponse);
                        } catch (refreshedError) {
                            reject(refreshedError);
                        }
                    });
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                await useAuthStore.getState().refresh();
                processQueue();
                return $api(originalRequest);
            } catch (refreshError) {
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);