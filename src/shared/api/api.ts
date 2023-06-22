import axios from "axios";
import { USER_LOCALSTORAGE_KEY } from "shared/const/localstorage";
import { refreshAccessToken } from "modules/auth/services/authServices";

const API_URL = `${process.env.REACT_APP_SERVER_ENDPOINT}/api`

export const $api = axios.create({
    baseURL: API_URL,
    withCredentials: true,
})

$api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem(USER_LOCALSTORAGE_KEY)}`
    return config
},
    error => {
        Promise.reject(error)
    }
)

$api.interceptors.response.use((response) => {
    return response
}, async function (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const access_token = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
        return $api(originalRequest);
    }
    return Promise.reject(error);
});