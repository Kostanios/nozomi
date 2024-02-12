import axios from 'axios';
import { authStore } from "../store/auth.store";
import config from './config.json';

const LONG_RUNNING_REQUEST_TIMEOUT = 10000; // 60s

const axiosInstance = axios.create({
    timeout: LONG_RUNNING_REQUEST_TIMEOUT, // for development mode set 0
    transitional: {
        clarifyTimeoutError: true
    },
    baseURL: config.BACK_BASE_URL
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            authStore.setState({ user: null });
            clearJWT();
        }
        return Promise.reject(error);
    });

export const setJWT = (token: string) => axiosInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
});

export const clearJWT = () => axiosInstance.interceptors.request.use((config) => {
    delete config.headers["Authorization"];
    return config;
});

export default axiosInstance;
