import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { destroyCookie, parseCookies } from 'nookies';

const baseURL = import.meta.env.VITE_BASE_URL;
const apiKEY = import.meta.env.VITE_API_KEY;

const api = axios.create({ baseURL });

api.interceptors.response.use(
    (response: AxiosResponse) => {
        return response
    },
    (error) => {
        if (error.config.url === '/') {
            error.
                destroyCookie(null, 'cookie_access_token', { path: '/' })
            window.location.href = '/login'
        }
        return Promise.reject(error);
    }
);

api.interceptors.request.use((config: AxiosRequestConfig): any => {
    const { ['cookie_access_token']: token } = parseCookies();
    
    if (
        config.url === '/auth/login' ||
        config.url === '/auth/registerUser' ||
        config.url === '/auth/registerBusiness'
    ) {
        config.headers!['api-key'] = `${apiKEY}`
    } else {
        config.headers!['Authorization'] = `Bearer ${token}`
    }

    return config;
}
);

export default api;

export const fetcher = (path: string) => api.get(path).then((res) => res.data);
